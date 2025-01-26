import { Injectable, inject } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from '../../../../environments/environment';
import { Endpoints } from '../../../endpoints/Endpoints';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private excludedURLs = [
    Endpoints.MOVIES,
    Endpoints.TV_SHOWS,
    Endpoints.TRENDS,
    Endpoints.SEARCH,
    Endpoints.IMAGE_BASE,
  ];

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isExcluded = this.excludedURLs.some((xurl) =>
      request.url.includes(xurl)
    );

    if (this.authService.isAuthenticated() && !isExcluded) {
      const user = localStorage.getItem(environment.userkey) ?? '';
      if (user) {
        const userObj = JSON.parse(user);
        const req = request.clone({
          setHeaders: {
            Authorization: userObj.token,
          },
        });
        return next.handle(req);
      }
    }

    return next.handle(request);
  }
}

export const AuthInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
};
