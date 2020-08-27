import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { serverBaseUrl } from '../configs/endpoints';
import { AuthService } from '../services/auth/auth.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const externalUrl = request.url.startsWith(serverBaseUrl);
    const currentToken = this.authenticationService.getToken();
    // We can probably add extra data in here to clock auth check on requests that don't need them.
    if (currentToken && externalUrl) {
      return currentToken.pipe(
        switchMap((token: string) => {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${token}`,
            },
          });
          return next.handle(request);
        })
      );
    } else {
      return next.handle(request);
    }
  }
}
