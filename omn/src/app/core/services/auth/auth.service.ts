import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { get } from 'lodash';
import * as qs from 'qs';
import { BehaviorSubject, forkJoin, of, Subscription, throwError } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  map,
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
  sessionExpiryTimer: Subscription;
  authCheck$ = this.handleAuthCheck();
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
    return this.storeS.setItem('token', token);
  }
  // get token to local storage
  getToken() {
    return this.storeS.getItem('token').pipe(
      map((vM: any) => {
        console.log(vM);
        if (!vM) {
          return null;
        }
        return !this.isTokenExpired(get(vM, 'expiry', undefined))
          ? get(vM, 'key', null)
          : null;
      })
    );
  }
  getProfile(data: { token: string; phoneNumber: string; expiry: string }) {
    return this.doGetProfile(data.phoneNumber).pipe(
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
    console.log('timer S');
    // This runs every minute and checks for token expiration.
    unsubscriberHelper(this.sessionExpiryTimer);
    this.sessionExpiryTimer = this.timerS
      .buildIndefiniteTimer(60000)
      .subscribe((v) => {
        // Check expiry status.
        console.log('timer');
        this.authCheck$.subscribe((aC) => {
          console.log(aC);
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
    console.log('check');
    return this.getToken().pipe(
      switchMap((isAuthenticated) => {
        console.log(isAuthenticated);
        if (isAuthenticated) {
          return of(true);
        } else {
          return this.tryRelogin().pipe(
            catchError((v) => {
              return this.getAccountData().pipe(
                switchMap((acc) => {
                  if (acc) {
                    return this.doLogout(true, false);
                  } else {
                    return this.redirectToLogin();
                  }
                })
              );
            }),
            tap((v) => {
              console.log(v);
            })
          );
        }
      })
      // share()
    );
  }

  tryRelogin() {
    console.log('relogin');
    return this.getPhoneNumber().pipe(
      switchMap((pn) => {
        return this.getPassFromStore().pipe(
          map((ps) => {
            return [pn, ps];
          })
        );
      }),
      switchMap((vals: any) => {
        console.log(vals);
        if (vals[0] && vals[1]) {
          try {
            const reqData: Login = {
              userName: vals[0],
              password: vals[1],
            };
            return this.doLoginAndLoadProfile(reqData);
          } catch (err) {
            return of(null);
          }
        }
        return of(null);
      }),
      switchMap((res) => {
        try {
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

  // svae auth data to storage
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
    const op = forkJoin(obsList).pipe(
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
          console.log(err);
        }
      );
    }
    return op;
  }

  updateState(newState: AuthState) {
    this.authState.next(newState);
  }

  getAuthState() {
    return this.authState.pipe(
      share(),
      distinctUntilChanged(distinctCheckObj),
      filter((val: AuthState) => val && val.hasOwnProperty('init') && val.init),
      distinctUntilChanged()
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
        console.log(vv);
        return this.updatePassInStore(reqData.password).pipe(
          map((vvv) => vv),
          catchError((err) => {
            console.log(err);
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
}
