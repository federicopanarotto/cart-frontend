import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const logoutInterceptor: HttpInterceptorFn = (req, next) => {
  const authSrv = inject(AuthService);

  return next(req).pipe(
    catchError((response => {
      console.log(response);
      if (response instanceof HttpErrorResponse && response.status === 401) {
        authSrv.logout();
      }
      return throwError(() => response);
    }))
  );
};
