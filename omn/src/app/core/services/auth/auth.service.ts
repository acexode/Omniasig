import { assignIn } from 'lodash';
import { Injectable } from '@angular/core';
import {
    Router,
    ActivatedRoute,
    ActivatedRouteSnapshot,
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

@Injectable( {
    providedIn: 'root',
} )
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
    constructor(
        private storeS: CustomStorageService,
        private routerS: Router,
        private reqS: RequestService
    ) {
        // Load account state from local/session/cookie storage.
        this.storeS.getItem( 'token' ).subscribe( ( token: string ) => {
            if ( token ) {
                this.getAccountFromStorage( token );
            } else {
                this.authState.next( { ...this.initialState, ...{ init: true } } );
            }
        } );
    }

    // get user data from storage and set account and token to authstate
    getAccountFromStorage( token = null ) {
        this.storeS.getItem( 'account' ).subscribe( ( account: Account ) => {
            if ( account ) {
                this.authState.next( {
                    init: true,
                    account,
                    authToken: token,
                } );
            } else {
                this.authState.next( { ...this.initialState, ...{ init: true } } );
            }
        } );
    }

    // check if user exists
    findUserByPhoneNumber( phoneNumber: number ) {
        return this.reqS.get<any>(
            `${ authEndpoints.findUserByPhoneNumber }?phoneNumber=${ phoneNumber }`
        );
    }

    // request sms during login
    sendPhoneNumberSms( phoneNumber ) {
        const reqData: { phoneNumber: string; } = {
            phoneNumber,
        };
        return this.reqS.post<any>( authEndpoints.sendPhoneNumberSms, reqData );
    }

    confirmPhoneNumberSms( phoneNumber, code ) {
        const reqData: { phoneNumber: string; code: number; } = {
            phoneNumber,
            code,
        };
        return this.reqS.post<any>(
          authEndpoints.confirmPhoneNumberSms,
          reqData
        );
    }

    // save token to local storage
    saveToken( token: string ) {
        return this.storeS.setItem( 'token', token );
    }
    // get token to local storage
    getToken() {
        return this.storeS.getItem( 'token' );
    }

    // get user profile from ws
    getProfile( token, phoneNumber ) {
        return this.reqS
            .get<Account>(
                `${ authEndpoints.getUserProfile }?userNameOrId=${ phoneNumber }`
            )
            .pipe(
                switchMap( ( res ) => {
                    return this.processAuthResponse( {
                        account: { ...res, userStates: [ AccountStates.ACTIVE ] },
                        token,
                    } );
                } )
            );
    }

    // svae auth data to storage
    processAuthResponse( data: LoginResponse ) {
        const account = data.account ? data.account : null;
        const authToken = data.token ? data.token : null;
        return this.storeS.setItem( 'account', account ).pipe(
            tap( () => {
                this.authState.next( {
                    init: true,
                    account,
                    authToken,
                } );
            } ),
            map( ( v ) => data )
        );
    }

    accountActivated( acc: Account ) {
        return acc
            ? acc.userStates.findIndex( ( s ) => s === AccountStates.ACTIVE ) > -1
            : false;
    }

    /**
     *
     * @param phoneNumber phoneNumber of the user trying to login
     */
    saveLastLoginNumber( phoneNumber: string ) {
        return this.storeS.setItem( 'phoneNumber', phoneNumber );
    }

    lastLoginNumber() {
        return this.storeS.getItem( 'phoneNumber' );
    }

    doLogout() {
        this.storeS.removeItem( 'account' );
        this.storeS.removeItem( 'token' );
        this.authState.next( {
            ...this.initialState,
        } );
        this.routerS.navigateByUrl( '/login' );
    }

    updateState( newState: AuthState ) {
        this.authState.next( newState );
    }

    getAuthState() {
        return this.authState.pipe(
            share(),
            filter( ( val: AuthState ) => val && val.hasOwnProperty( 'init' ) && val.init ),
            distinctUntilChanged()
        );
    }

    getAccountData() {
        return this.getAuthState().pipe(
            share(),
            map( ( val: AuthState ) => {
                return val.account;
            } )
        );
    }

    // makes http call to server.
    login( loginData: {
        phone: string;
        password: any;
        aRoute: string | ActivatedRoute;
    } ) {
        const reqData: Login = {
            userName: loginData.phone,
            password: loginData.password,
        };
        return this.reqS.post<LoginResponse>( authEndpoints.login, reqData ).pipe(
            switchMap( ( res ) => {
                return this.saveToken( res.token ).pipe(
                    switchMap( () => {
                        return this.getProfile( res.token, loginData.phone );
                    } )
                );
            } ),
            tap( ( value ) => {
                let redirectUrl: any = '/home';
                if ( loginData.aRoute instanceof ActivatedRoute ) {
                    redirectUrl = this.redirectUrlTree(
                        loginData.aRoute ? loginData.aRoute.snapshot : null
                    );
                } else if ( typeof loginData.aRoute === 'string' ) {
                    redirectUrl = loginData.aRoute;
                }

                Promise.resolve( this.routerS.navigateByUrl( redirectUrl ) );
            } )
        );
    }

    redirectUrlTree( snapshot: ActivatedRouteSnapshot ): UrlTree {
        if ( snapshot ) {
            const qP = snapshot.queryParams;
            const rUk = 'returnUrl';
            if ( qP.hasOwnProperty( rUk ) && qP[ rUk ] ) {
                return this.routerS.createUrlTree( [ qP[ rUk ] ] );
            }
        }
        return this.routerS.createUrlTree( [ '/' ] );
    }

    demoActivate() {
        const state = this.authState.value;
        state.account.userStates = [
            AccountStates.ACTIVE,
            AccountStates.EMAIL_VALIDATED,
        ];
        this.authState.next( {
            init: true,
            account: { ...state.account },
        } );
        this.storeS.setItem( 'account', state.account );
    }

    demoUpdate( data: { cnp?: string; email?: string; } ) {
        const account = this.authState.value.account;
        if ( data.cnp ) {
            account.cnp = data.cnp;
        }
        if ( data.email ) {
            account.email = data.email;
        }
        this.storeS.setItem( 'account', account );
        this.authState.next( {
            init: true,
            account,
        } );
    }
    updateUserProfile(obj){
        return this.reqS.post(authEndpoints.updateUserProfile, obj);
      }
}
