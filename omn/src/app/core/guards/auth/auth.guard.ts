import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map,take } from 'rxjs/operators';
import { Account } from '../../models/account.interface';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate,CanActivateChild {
  constructor(private authS: AuthService, private routerS: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authS.getToken()
    .pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
       return this.routerS.createUrlTree(['/login']);
      })
    );
  }
  
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):  | Observable<boolean | UrlTree>
  | Promise<boolean | UrlTree>
  | boolean
  | UrlTree {
    return this.authS.getToken()
    .pipe(
      take(1),
      map(isAuthenticated => {
        if (isAuthenticated) {
          return true;
        }
       return this.routerS.createUrlTree(['/login']);
      })
    );
  }
}
