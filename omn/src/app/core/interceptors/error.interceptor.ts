import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';
import { catchError } from 'rxjs/operators';
import { Router, UrlTree } from '@angular/router';

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
          this.authenticationService.handleAuthCheck().subscribe((v) => {
            if (v instanceof UrlTree) {
              this.routerS.navigateByUrl(v);
              return throwError('__NO_DATA');
            } else if (!v) {
              return throwError(err);
            }
          });
        } else {
          return throwError(err);
        }
      })
    );
  }
}
