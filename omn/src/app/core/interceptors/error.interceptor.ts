import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError, take, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthService,
    private routerS: Router
  ) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          return this.authenticationService.handleAuthCheck().pipe(
            take(1),
            switchMap((v) => {
              if (v instanceof UrlTree) {
                this.routerS.navigateByUrl(v);
                return throwError('__NO_DATA');
              } else if (!v) {
                return throwError(err);
              } else {
                return next.handle(request);
              }
            })
          );
        } else {
          return throwError(err);
        }
      })
    );
  }
}
