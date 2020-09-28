import { CustomTimersService } from './../custom-timers/custom-timers.service';
import { unsubscriberHelper } from './../../helpers/unsubscriber.helper';
import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from '@angular/router';
import { ToastController } from '@ionic/angular';
import { get } from 'lodash';
import * as qs from 'qs';
import { BehaviorSubject, throwError, Subscription, of, pipe } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  share,
  switchMap,
  take,
  tap,
} from 'rxjs/operators';
import { authEndpoints } from '../../configs/endpoints';
import { AccountStates } from '../../models/account-states';
import { Account } from '../../models/account.interface';
import { AuthState } from '../../models/auth-state.interface';
import { LoginResponse } from '../../models/login-response.interface';
import { Login } from '../../models/login.interface';
import { CustomStorageService } from '../custom-storage/custom-storage.service';
import { RequestService } from '../request/request.service';

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
        if (!vM) {
          return null;
        }
        return !this.isTokenExpired(get(vM, 'expiry', undefined))
          ? get(vM, 'key', null)
          : null;
      })
    );
  }

  // get user profile from ws
  getProfile(data: { token: string; phoneNumber: string; expiry: string }) {
    return this.reqS
      .get<Account>(
        `${authEndpoints.getUserProfile}?userNameOrId=${data.phoneNumber}`
      )
      .pipe(
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

  setExpireTimer() {
    // This runs every minute and checks for token expiration.
    unsubscriberHelper(this.sessionExpiryTimer);
    this.sessionExpiryTimer = this.timerS
      .buildIndefiniteTimer(60000)
      .subscribe((v) => {
        // Check expiry status.
        this.handleAuthCheck().subscribe((aC) => {
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
    return this.getToken().pipe(
      take(1),
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return of(true);
        } else {
          return this.getAccountData().pipe(
            take(1),
            switchMap((acc) => {
              if (acc) {
                this.doLogout(true);
                return of(false);
              } else {
                return this.redirectToLogin();
              }
            })
          );
        }
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

  doLogout(expired = false) {
    unsubscriberHelper(this.sessionExpiryTimer);
    this.storeS.removeItem('account');
    this.storeS.removeItem('token');
    if (!expired) {
      this.storeS.removeItem('phoneNumber');
    }

    this.authState.next({
      ...this.initialState,
    });
    if (expired) {
      // Flag the page with a message to the user.
      return this.getPhoneNumber()
        .pipe(take(1))
        .subscribe((value) => {
          if (value) {
            this.routerS.navigate(['/login', 'verify', value], {
              queryParams: {
                expired: true,
              },
            });
          } else {
            this.routerS.navigate(['/login'], {
              queryParams: {
                expired: true,
              },
            });
          }
        });
    } else {
      this.routerS.navigateByUrl('/login');
    }
  }

  updateState(newState: AuthState) {
    this.authState.next(newState);
  }

  getAuthState() {
    return this.authState.pipe(
      share(),
      filter((val: AuthState) => val && val.hasOwnProperty('init') && val.init),
      distinctUntilChanged()
    );
  }

  getAccountData() {
    return this.getAuthState().pipe(
      share(),
      map((val: AuthState) => {
        return val.account;
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

    return this.doLogin(reqData).pipe(
      switchMap((res) => {
        return this.saveToken({ key: res.token, expiry: res.expiration }).pipe(
          switchMap(() => {
            return this.getProfile({
              token: res.token,
              phoneNumber: loginData.phone,
              expiry: res.expiration,
            });
          })
        );
      }),
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
    return this.reqS
      .post<LoginResponse>(authEndpoints.login, reqData)
      .pipe(take(1));
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

  demoActivate() {
    const state = this.authState.value;
    state.account.userStates = [
      AccountStates.ACTIVE,
      AccountStates.EMAIL_VALIDATED,
    ];
    this.authState.next({
      init: true,
      account: { ...state.account },
    });
    this.storeS.setItem('account', state.account);
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
    return this.reqS.get(endpointV + '?' + encodedQs);
  }

  doReqNewEmailCode() {
    return this.getAccountData().pipe(
      take(1),
      switchMap((value: Account) => {
        if (value && value.email) {
          return this.doChangeEmail(value.email);
        } else {
          throw throwError('NO_ACCOUNT_EMAIL');
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
          throw throwError('NO_NUMBER');
        }
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
