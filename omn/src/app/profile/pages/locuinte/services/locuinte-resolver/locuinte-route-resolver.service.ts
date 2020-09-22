import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { Observable } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';

import { PadService } from 'src/app/modules/policy/services/pad.service';
import { Account } from 'src/app/core/models/account.interface';

@Injectable( {
  providedIn: 'root'
} )
export class LocuinteRouteResolver implements Resolve<any> {

  authData: Account;

  constructor( private padS: PadService, private authS: AuthService ) { }

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Observable<any> | Promise<any> | any> {
    const id = +route.paramMap.get( 'id' );
    console.log( 'resolve id: ', id );
    this.authS.getAccountData().subscribe( authData => this.authData = authData );
    return {
      id,
      userData: this.authData,
    };
    // this.authS.getAccountData().subscribe(d => console.log('auth data: ', d));
    // this.padS.checkPad( 79, '7e7f51a1-5f7e-4118-9fee-74fb407400fe' ).subscribe( d => {
    //   console.log( d );
    // } );
  }

}
