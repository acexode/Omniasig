import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate, CanActivateChild {
  constructor(private authS: AuthService, private routerS: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authS.getToken().pipe(
      take(1),
      switchMap((isAuthenticated) => {
        if (isAuthenticated) {
          return of(this.routerS.createUrlTree(['/home']));
        } else {
          return of(true);
        }
      })
    );
  }

  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authS.getToken().pipe(
      take(1),
      map((isAuthenticated) => {
        if (isAuthenticated) {
          return this.routerS.createUrlTree(['/home']);
        } else {
          return true;
        }
      })
    );
  }
}
