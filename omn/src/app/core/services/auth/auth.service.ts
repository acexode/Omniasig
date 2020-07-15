import { Injectable } from "@angular/core";
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  Router,
  UrlTree,
} from "@angular/router";
import { BehaviorSubject } from "rxjs";
import {
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from "rxjs/operators";
import { authEndpoints } from "../../configs/endpoints";
import { AccountStates } from "../../models/account-states";
import { Account } from "../../models/account.interface";
import { AuthState } from "../../models/auth-state.interface";
import { LoginResponse } from "../../models/login-response.interface";
import { Login } from "../../models/login.interface";
import { CustomStorageService } from "../custom-storage/custom-storage.service";
import { RequestService } from "../request/request.service";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  demoAccount: Account = {
    firstName: "Ion",
    lastName: "Ionescu",
    cnp: "189******7634",
    email: "escuion@email.com",
    addresses: [
      "Strada Traian 45, Brasov, jud. Brasov, Cod 500332",
      `Strada Dimitrie Bolintineanu 71-73, Scara B, Ap. 21 Turnu Magurele,
      jud.Teleorman, Cod 654321`,
    ],
    userStates: [],
  };
  // TODO: DEMO - reset auth state to default one login is implemented.
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
    this.storeS.getItem("account").subscribe((account: Account) => {
      this.authState.next({ init: true, account });
    });

    // TODO: Remove Demo code once logi is implemented.
    this.authState.next({
      init: true,
      account: this.demoAccount,
    });
  }

  updateState(newState: AuthState) {
    this.authState.next(newState);
  }

  getAuthState() {
    return this.authState.pipe(
      filter((val: AuthState) => val && val.hasOwnProperty("init") && val.init),
      distinctUntilChanged()
    );
  }

  getAccountData() {
    return this.getAuthState().pipe(map((val: AuthState) => val.account));
  }

  login(loginData: {
    email: string;
    password: string;
    aRoute: ActivatedRoute;
  }) {
    const reqData: Login = {
      email: loginData.email,
      password: loginData.password,
    };
    return this.reqS.post<LoginResponse>(authEndpoints.login, reqData).pipe(
      switchMap((val) => {
        return this.processAuthResponse(val);
      }),
      tap((value) => {
        const redirectUrl = this.redirectUrlTree(
          loginData.aRoute ? loginData.aRoute.snapshot : null
        );
        Promise.resolve(this.routerS.navigateByUrl(redirectUrl));
      })
    );
  }

  processAuthResponse(data: LoginResponse) {
    const account = data.account ? data.account : null;
    return this.storeS.setItem("account", account).pipe(
      tap(() => {
        this.authState.next({
          init: true,
          account,
        });
      }),
      map((v) => data)
    );
  }

  redirectUrlTree(snapshot: ActivatedRouteSnapshot): UrlTree {
    if (snapshot) {
      const qP = snapshot.queryParams;
      const rUk = "returnUrl";
      if (qP.hasOwnProperty(rUk) && qP[rUk]) {
        return this.routerS.createUrlTree([qP[rUk]]);
      }
    }

    return this.routerS.createUrlTree(["/"]);
  }

  accountActivated(acc: Account) {
    return acc.userStates.findIndex((s) => s === AccountStates.ACTIVE) > -1;
  }
}
