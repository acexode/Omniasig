import { Injectable } from '@angular/core';
import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { get } from 'lodash';
import * as qs from 'qs';
import {
  BehaviorSubject,
  combineLatest,
  Observable,
  of,
  Subscription,
  throwError,
} from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
  mergeMap,
  share,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { authEndpoints } from '../../configs/endpoints';
import { distinctCheckObj } from '../../helpers/distinct-check.helper';
import { Account } from '../../models/account.interface';
import { AuthState } from '../../models/auth-state.interface';
import { LoginResponse } from '../../models/login-response.interface';
import { Login } from '../../models/login.interface';
import { CustomStorageService } from '../custom-storage/custom-storage.service';
import { RequestService } from '../request/request.service';
import { unsubscriberHelper } from './../../helpers/unsubscriber.helper';
import { CustomTimersService } from './../custom-timers/custom-timers.service';

export const __AUTH_PASS_KEY = 'authPassword';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  initialState: AuthState = {
    init: false,
    account: null,
    authToken: '',
    expiryDate: null,
  };
  authState: BehaviorSubject<AuthState> = new BehaviorSubject(
    this.initialState
  );
  tokenStore: BehaviorSubject<any> = new BehaviorSubject(null);
  logoutListener: BehaviorSubject<any> = new BehaviorSubject(null);
  sessionExpiryTimer: Subscription;
  authCheck$ = of(true).pipe(share());
  tokenCheck$ = of(true).pipe(share());
  constructor(
    private storeS: CustomStorageService,
    private routerS: Router,
    private reqS: RequestService,
    private timerS: CustomTimersService
  ) {
    // Load account state from local/session/cookie storage.
    this.storeS.getItem('token').subscribe((token: string) => {
      if (token) {
        this.getAccountFromStorage(token);
        this.setExpireTimer();
      } else {
        this.authState.next({ ...this.initialState, ...{ init: true } });
      }
    });
  }

  // get user data from storage and set account and token to authstate
  getAccountFromStorage(token = null) {
    this.storeS.getItem('account').subscribe((account: Account) => {
      if (account) {
        this.authState.next({
          init: true,
          account,
          authToken: token.key,
          expiryDate: token.expiry,
        });
      } else {
        this.authState.next({ ...this.initialState, ...{ init: true } });
      }
    });
  }

  // check if user exists
  findUserByPhoneNumber(phoneNumber: number) {
    return this.reqS.get<any>(
      `${authEndpoints.findUserByPhoneNumber}?phoneNumber=${phoneNumber}`
    );
  }
  // check if user exists
  checkCNP(cnp, phoneNumber) {
    return this.reqS.get<any>(
      `${authEndpoints.checkCNP}?cnp=${cnp}&phoneNumber=${phoneNumber}`
    );
  }

  // Validate cnp.
  validateCNP(cnp) {
    return this.reqS.post<any>(`${authEndpoints.validateCNP}`, { cnp });
  }

  // check GDPR
  checkGDPR(userId: string) {
    return this.reqS.post<any>(`${authEndpoints.checkGDPR}?userId=${userId}`, { });
  }

  // request sms during login
  sendPhoneNumberSms(phoneNumber) {
    const reqData: { phoneNumber: string } = {
      phoneNumber,
    };
    return this.reqS.post<any>(authEndpoints.sendPhoneNumberSms, reqData);
  }

  confirmPhoneNumberSms(phoneNumber, code) {
    const reqData: { phoneNumber: string; code: number } = {
      phoneNumber,
      code,
    };
    return this.reqS.post<any>(authEndpoints.confirmPhoneNumberSms, reqData);
  }

  // save token to local storage
  saveToken(token: { key: string; expiry: string }) {
    this.tokenStore.next(token);
    return this.storeS.setItem('token', token);
  }
  // Get token from local storage.
  getToken() {
    // Try in memory first, to speed things up.
    return this.tokenCheck$.pipe(
      mergeMap((v1) => this.tokenStore.pipe(take(1))),
      mergeMap((v2) => {
        const key = get(v2, 'key', null);
        // Default to getting it out of the local storage.
        return !this.isTokenExpired(get(v2, 'expiry', undefined)) && key
          ? of(v2)
          : this.storeS.getItem('token');
      }),
      take(1),
      map((vM: any) => {
        if (!vM) {
          this.tokenStore.next(null);
          return null;
        }
        if (!this.isTokenExpired(get(vM, 'expiry', undefined))) {
          const key = get(vM, 'key', null);
          this.tokenStore.next(vM);
          return key;
        } else {
          this.tokenStore.next(null);
          return null;
        }
      })
    );
  }

  // Get and process an user profile.
  getProfile(data: { token: string; phoneNumber: string; expiry: string }) {
    return this.doGetProfile(data.phoneNumber).pipe(
      take(1),
      switchMap((res) => {
        this.setExpireTimer();
        return this.processAuthResponse({
          account: { ...res },
          token: data.token,
          expiration: data.expiry,
        });
      })
    );
  }

  doGetProfile(phoneNumber) {
    return this.reqS.get<Account>(
      `${authEndpoints.getUserProfile}?userNameOrId=${phoneNumber}`
    );
  }

  setExpireTimer() {
    // This runs every minute and checks for token expiration.
    unsubscriberHelper(this.sessionExpiryTimer);
    this.sessionExpiryTimer = this.timerS
      .buildIndefiniteTimer(60000)
      .subscribe((v) => {
        // Check expiry status.
        this.handleAuthCheck()
          .pipe(take(1))
          .subscribe((aC) => {
            if (aC instanceof UrlTree) {
              this.routerS.navigateByUrl(aC);
            }
          });
      });
  }

  /**
   * Used by both the auth guard and the
   * expirations process to decide if an user login is valid.
   */
  handleAuthCheck() {
    return this.authCheck$.pipe(
      // Get un-expired token.
      switchMap((v) => this.getToken()),
      switchMap((isAuthenticated) => {
        const account = get(this.authState.value, 'account', null);
        if (isAuthenticated && account) {
          return of(true);
        } else {
          // If token is expired, try to rebuild the token with phone number + passcode.
          return this.tryRelogin().pipe(
            catchError((v) => {
              // Redirect to clean logout, or pass expiry if account exists.
              return this.getAccountData().pipe(
                switchMap((acc) => {
                  if (acc) {
                    return this.doLogout(true, false);
                  } else {
                    if (!isAuthenticated) {
                      return this.redirectToLogin();
                    }
                    return this.doLogout(true);
                  }
                })
              );
            })
          );
        }
      })
    );
  }

  /**
   * Try to get a new token with the stored account data.
   */
  tryRelogin() {
    // Get phone number.
    return this.getPhoneNumber().pipe(
      switchMap((pn) => {
        // Get a stored password via secure store.
        return this.getPassFromStore().pipe(
          map((ps) => {
            return [pn, ps];
          })
        );
      }),
      switchMap((vals: any) => {
        if (vals[0] && vals[1]) {
          try {
            const reqData: Login = {
              userName: vals[0],
              password: vals[1],
            };
            // Try a login and account refresh.
            return this.doLoginAndLoadProfile(reqData);
          } catch (err) {
            return of(null);
          }
        }
        return of(null);
      }),
      switchMap((res) => {
        try {
          // Try saving the new token.
          return this.saveToken({
            key: res.token,
            expiry: res.expiration,
          });
        } catch (err) {
          return throwError(err);
        }
      }),
      map((v) => {
        return true;
      })
    );
  }

  refreshProfile(override = {}) {
    return this.lastLoginNumber().pipe(
      take(1),
      switchMap((v) => {
        if (!v) {
          return this.doLogout(false, false).pipe(
            map((opv) => {
              return v;
            })
          );
        } else {
          return this.doGetProfile(v);
        }
      }),
      switchMap((profile: any) => {
        const p = { ...profile, ...override };
        return this.storeS.setItem('account', p).pipe(
          take(1),
          map((resV) => {
            return p;
          })
        );
      }),
      map((value: Account) => {
        this.doUpdateAccount(value);
        return value;
      })
    );
  }

  // This will go to the password input automatically.
  redirectToLogin() {
    return this.getPhoneNumber().pipe(
      take(1),
      map((value) => {
        if (value) {
          return this.routerS.createUrlTree(['/login', 'verify', value]);
        } else {
          return this.routerS.createUrlTree(['/login']);
        }
      })
    );
  }

  // save auth data to storage
  processAuthResponse(data: LoginResponse) {
    const account = data.account ? data.account : null;
    const authToken = data.token ? data.token : null;
    const expiry = data.expiration ? data.expiration : null;
    return this.storeS.setItem('account', account).pipe(
      tap(() => {
        this.authState.next({
          init: true,
          account,
          authToken,
          expiryDate: expiry,
        });
      }),
      map((v) => data)
    );
  }

  accountActivated(acc: Account) {
    return acc
      ? get(acc, 'isBiometricValid', false) === true &&
          get(acc, 'isEmailConfirmed', false) === true
      : false;
  }

  /**
   *
   * @param phoneNumber phoneNumber of the user trying to login
   */
  saveLastLoginNumber(phoneNumber: string) {
    return this.storeS.setItem('phoneNumber', phoneNumber);
  }

  getPhoneNumber() {
    return this.storeS.getItem('phoneNumber').pipe(take(1));
  }

  /**
   * Execute a logout.
   *
   * @param expired
   *  - This should be set up by the atuomatic process that handles token expiration.
   * @param execObs
   *  - This will subscribe automatically to the logout process. mostly linked to the button.
   *
   * Will return the redirect url observable.
   */
  doLogout(expired = false, execObs = true) {
    unsubscriberHelper(this.sessionExpiryTimer);
    const obsList = [
      this.storeS.removeItem('account'),
      this.storeS.removeItem('token'),
      this.removePassFromStore(),
    ];

    if (!expired) {
      obsList.push(this.storeS.removeItem('phoneNumber'));
    }

    this.authState.next({
      ...this.initialState,
    });
    this.tokenStore.next(null);
    const op = combineLatest(obsList).pipe(
      switchMap((vvv) => {
        if (expired) {
          // Flag the page with a message to the user.
          return this.getPhoneNumber();
        } else {
          return of('/login');
        }
      }),
      map((value) => {
        if (value === '/login') {
          return this.routerS.createUrlTree([value]);
        } else if (value) {
          return this.routerS.createUrlTree(['/login', 'verify', value], {
            queryParams: {
              expired: true,
            },
          });
        } else {
          return this.routerS.createUrlTree(['/login'], {
            queryParams: {
              expired: true,
            },
          });
        }
      })
    );
    // Basic calls will have to redirect to the specific login page.
    if (execObs) {
      op.subscribe(
        (rL) => {
          this.routerS.navigateByUrl(rL);
        },
        (err) => {
          this.routerS.navigateByUrl('/login');
        }
      );
    }
    this.logoutListener.next(new Date().getMilliseconds());
    return op;
  }

  updateState(newState: AuthState) {
    this.authState.next(newState);
  }

  getAuthState() {
    return this.authState.pipe(
      filter((val: AuthState) => val && val.hasOwnProperty('init') && val.init),
      distinctUntilChanged(distinctCheckObj)
    );
  }

  getAccountData() {
    return this.getAuthState().pipe(
      map((val: AuthState) => {
        return val.account;
      })
    );
  }

  updatePassInStore(passValue) {
    return this.storeS.setSecureItem(__AUTH_PASS_KEY, passValue);
  }

  getPassFromStore() {
    return this.storeS.getSecureItem(__AUTH_PASS_KEY);
  }

  removePassFromStore() {
    return this.storeS
      .removeSecureItem(__AUTH_PASS_KEY)
      .pipe(catchError((err) => of(true)));
  }

  doLoginAndLoadProfile(reqData) {
    return this.doLogin(reqData).pipe(
      switchMap((res) => {
        return this.saveToken({ key: res.token, expiry: res.expiration }).pipe(
          switchMap(() => {
            return this.getProfile({
              token: res.token,
              phoneNumber: reqData.userName,
              expiry: res.expiration,
            });
          })
        );
      })
    );
  }

  // makes http call to server.
  login(loginData: {
    phone: string;
    password: any;
    aRoute: string | ActivatedRoute;
  }) {
    const reqData: Login = {
      userName: loginData.phone,
      password: loginData.password,
    };

    return this.doLoginAndLoadProfile(reqData).pipe(
      take(1),
      tap((value) => {
        let redirectUrl: any = '/home';
        if (loginData.aRoute instanceof ActivatedRoute) {
          redirectUrl = this.redirectUrlTree(
            loginData.aRoute ? loginData.aRoute.snapshot : null
          );
        } else if (typeof loginData.aRoute === 'string') {
          redirectUrl = loginData.aRoute;
        } else if (loginData.aRoute === null) {
          redirectUrl = null;
        }
        if (redirectUrl) {
          Promise.resolve(this.routerS.navigateByUrl(redirectUrl));
        }
      })
    );
  }

  doLogin(reqData: Login) {
    return this.reqS.post<LoginResponse>(authEndpoints.login, reqData).pipe(
      switchMap((vv) => {
        return this.updatePassInStore(reqData.password).pipe(
          map((vvv) => vv),
          catchError((err) => {
            return of(vv);
          })
        );
      })
    );
  }

  redirectUrlTree(snapshot: ActivatedRouteSnapshot): UrlTree {
    if (snapshot) {
      const qP = snapshot.queryParams;
      const rUk = 'returnUrl';
      if (qP.hasOwnProperty(rUk) && qP[rUk]) {
        return this.routerS.createUrlTree([qP[rUk]]);
      }
    }
    return this.routerS.createUrlTree(['/']);
  }

  doUpdateAccount(data: {
    cnp?: string;
    email?: string;
    name?: string;
    surname?: string;
    dateBirth?: any;
    [key: string]: any;
  }) {
    const account = this.authState.value.account;
    const newAccount = { ...account, ...data };

    this.storeS.setItem('account', newAccount);
    this.authState.next({
      init: true,
      account: { ...newAccount },
    });
  }

  validateEmail(dataObj, newEmail?: boolean) {
    const endpointV = newEmail
      ? authEndpoints.confirmNewEmail
      : authEndpoints.confirmEmailChange;
    // Use custom query encode so that Angular will not remove token chars.
    const encodedQs = qs.stringify(dataObj, {
      encoder: (str) => {
        return encodeURIComponent(str);
      },
    });
    return this.reqS.get(endpointV + '?' + encodedQs).pipe(
      switchMap((v) => {
        if (v) {
          return this.refreshProfile();
        } else {
          return throwError('');
        }
      })
    );
  }

  doReqNewEmailCode() {
    return this.getAccountData().pipe(
      take(1),
      switchMap((value: Account) => {
        if (value && value.email) {
          return this.doChangeEmail(value.email);
        } else {
          return throwError('NO_ACCOUNT_EMAIL');
        }
      })
    );
  }

  doChangeEmail(newEmail: string) {
    return this.getPhoneNumber().pipe(
      take(1),
      switchMap((phoneNum) => {
        if (phoneNum) {
          return this.reqS.post(authEndpoints.changeEmail, {
            userNameOrId: phoneNum,
            newEmail,
          });
        } else {
          return throwError('NO_NUMBER');
        }
      }),
      switchMap(() => {
        return this.refreshProfile({ email: newEmail });
      })
    );
  }

  lastLoginNumber() {
    return this.storeS.getItem('phoneNumber');
  }

  updateUserProfile(obj) {
    return this.reqS.post(authEndpoints.updateUserProfile, obj).pipe(
      tap((v) => {
        this.doUpdateAccount(obj);
      })
    );
  }

  isTokenExpired(date?: string | Date): boolean {
    if (date === undefined) {
      return false;
    }
    try {
      const expDate = new Date(date);
      const boolVal = !(expDate.valueOf() > new Date().valueOf());
      return boolVal;
    } catch (e) {
      return null;
    }
  }

  public cnpValidator(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return this.validateCNP(control.value).pipe(
        catchError((err) => {
          return of(null);
        }),
        map((res) => {
          return res ? null : { invalidCnp2: true };
        })
      );
    };
  }
}
