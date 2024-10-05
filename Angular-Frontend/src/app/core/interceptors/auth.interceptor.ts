import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { conf } from 'src/environement';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService, private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem(conf.ACCESS_TOKEN_KEY);
    const refreshToken = localStorage.getItem(conf.REFRESH_TOKEN_KEY);  // Assuming you're storing the refresh token

    if (accessToken) {
      // Attach the access token to the request
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    }

    // Proceed with the request
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401 && refreshToken) {
          // Token expired, try refreshing the token
          return this.authService.refreshToken(refreshToken).pipe(
            switchMap((newTokens) => {
              // Store new tokens in local storage
              localStorage.setItem(conf.ACCESS_TOKEN_KEY, newTokens.access);
              localStorage.setItem(conf.REFRESH_TOKEN_KEY, newTokens.refresh);

              // Clone the failed request and attach the new token
              const newRequest = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${newTokens.access}`
                }
              });

              // Retry the request with the new token
              return next.handle(newRequest);
            }),
            catchError(refreshError => {
              // If refresh fails, log the user out or redirect to login
              this.authService.logout();  // Log the user out
              this.router.navigate(['/login']);  // Redirect to login page
              return throwError(() => refreshError);  // Propagate the error
            })
          );
        } else {
          // For other errors, just propagate the error
          return throwError(() => error);
        }
      })
    );
  }
}
