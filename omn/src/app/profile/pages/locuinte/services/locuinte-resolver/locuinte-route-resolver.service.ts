import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Account } from 'src/app/core/models/account.interface';

@Injectable( {
  providedIn: 'root'
} )
export class LocuinteRouteResolver implements Resolve<any> {

  authData: Account;

  constructor( private authS: AuthService ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Observable<any> | Promise<any> | any> {
    const id = +route.paramMap.get( 'id' );
    this.authS.getAccountData().subscribe(
      authData => {
        this.authData = authData;
      } );

    return {
      locationId: id,
      userId: this.authData.userId,
      userData: this.authData,
    };
  }

}
