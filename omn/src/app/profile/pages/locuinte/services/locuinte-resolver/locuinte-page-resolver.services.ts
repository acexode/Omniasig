import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Account } from 'src/app/core/models/account.interface';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';

@Injectable( {
    providedIn: 'root'
} )
export class LocuintePageRouteResolver implements Resolve<any> {

    authData: Account;
    card$: any;
    error: any;

    constructor( private authS: AuthService, private locuinteS: LocuinteService ) { }

    async resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot,
    ): Promise<Observable<any> | Promise<any> | any> {
        try {
            this.locuinteS.loadAllData();
            this.authS.getAccountData().subscribe(
                authData => {
                    this.authData = authData;
                } );
        } catch ( error ) {
            this.error = error;
        }

        return {
            cards$: this.locuinteS.locuinteStore$,
            authData: this.authData,
            error: this.error ? this.error :  null,
        };
    }

}
