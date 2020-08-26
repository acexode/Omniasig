import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Route,
  Router,
  UrlTree,
} from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {
  distinctUntilChanged,
  filter,
  map,
  share,
  switchMap,
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
  demoAccount: Account = {
    id: 1,
    firstName: 'Ion',
    lastName: 'Ionescu',
    cnp: '1234567890123',
    email: 'escuion@email.com',
    addresses: [
      'Strada Traian 45, Brasov, jud. Brasov, Cod 500332',
      'Strada Dimitrie Bolintineanu 71-73, Scara B, Ap. 21 Turnu Magurele jud.Teleorman, Cod 654321',
    ],
    // userStates: [AccountStates.INACTIVE, AccountStates.EMAIL_INVALIDATED],
    userStates: [],
  };
  // TODO: DEMO - reset auth state to default once login is implemented.
  initialState: AuthState = {
    init: false,
    account: null,
  };
  authState: BehaviorSubject<AuthState> = new BehaviorSubject(
    this.initialState
  );
  constructor(
    private storeS: CustomStorageService,
    private routerS: Router,
    private reqS: RequestService
  ) {
    // Load account state from local/session/cookie storage.
    this.storeS.getItem('account').subscribe((account: Account) => {
      if (account) {
        this.authState.next({
          init: true,
          account,
        });
      } else {
        // TODO: Remove Demo code once logi is implemented.
        this.storeS.setItem('account', this.demoAccount);

        this.authState.next({
          init: true,
          account: this.demoAccount,
        });
      }
    });
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

  login(loginData: {
    phone: string;
    password: any;
    aRoute: string;
  }) {
    const reqData: Login = {
      userName: loginData.phone,
      password: loginData.password,
    };
    return this.reqS.post<LoginResponse>(authEndpoints.login, reqData).pipe(
      switchMap((res) => {
        console.log(res.token);
        this.saveToken(res.token.token)
        return this.getProfile(res.token.token);
      }),
      tap((value) => {
        console.log(value);
        Promise.resolve(this.routerS.navigateByUrl("/home"));
      })
    );
  }

  saveToken(token:string){
console.log(    "saved token");
    return this.storeS.setItem('token',token)
  }

getProfile(token){
  // return this.reqS.get<Account>('').pipe(
  //   switchMap((res)=>{
  //     return this.processAuthResponse({account:res,token});
  //   })
  // )
  console.log("got profile");
  
  return this.processAuthResponse({account:this.demoAccount,token});
}

  processAuthResponse(data: LoginResponse) {
    console.log(data);
    
    const account = data.account ? data.account : null;
    const authToken = data.token.token ? data.token.token : null;
    return this.storeS.setItem('account', account).pipe(
      tap(() => {
        this.authState.next({
          init: true,
          account,
          authToken
        });
      }),
      map((v) => data)
    );
  }

  accountActivated(acc: Account) {
    return acc.userStates.findIndex((s) => s === AccountStates.ACTIVE) > -1;
  }

  // TODO: DEMO
  demoLogout() {
    this.storeS.removeItem('account');
    this.storeS.setItem('account', this.demoAccount);
    this.authState.next({
      init: true,
      account: this.demoAccount,
    });
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

  demoUpdate(data: { cnp?: string; email?: string }) {
    const account = this.authState.value.account;
    if (data.cnp) {
      account.cnp = data.cnp;
    }
    if (data.email) {
      account.email = data.email;
    }
    this.storeS.setItem('account', account);
    this.authState.next({
      init: true,
      account,
    });
  }
}
