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

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    const externalUrl = request.url.startsWith(serverBaseUrl);
    const currentUser = this.authenticationService.getAuthState();
    // We can probably add extra data in here to clock auth check on requests that don't need them.
    if (currentUser && externalUrl) {
      let token = '';
      currentUser.subscribe((user) => (token = user.authToken));
      console.log(token)
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    return next.handle(request);
  }
}
