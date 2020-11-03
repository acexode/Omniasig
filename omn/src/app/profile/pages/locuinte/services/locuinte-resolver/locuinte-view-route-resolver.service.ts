import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Account } from 'src/app/core/models/account.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LocuinteViewRouteResolver implements Resolve<any> {
  authData: Account;

  constructor(private authS: AuthService) {}

  async resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<Observable<any> | Promise<any> | any> {
    const id = +route.paramMap.get('id');
    this.authS
      .getAccountData()
      .pipe(take(1))
      .subscribe((authData) => {
        this.authData = authData;
      });

    return {
      locationId: id,
      userId: this.authData.userId,
      userData: this.authData,
    };
  }
}
