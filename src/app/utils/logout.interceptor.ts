import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, Observable, switchMap, tap, throwError } from 'rxjs';
import { JwtService } from '../services/jwt.service';

export const logoutInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService)

    return next(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return authSrv.refreshTokens().pipe(
            switchMap(tokens => {  
                const newReq = req.clone({
                  setHeaders: {
                    Authorization: `Bearer ${tokens.token}`
                  }
                });
  
                return next(newReq);
            }),
            catchError(err => {
              authSrv.logout();
              return throwError(() => err);
            })
          );
        }
  
        return throwError(() => error);
      })
    );
}
