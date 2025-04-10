import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { JwtService } from '../services/jwt.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authToken = inject(JwtService).getToken();
  
  if (authToken) {
    const newReq = req.clone({
      headers: req.headers.append(`Authorization`, `Bearer ${authToken}`)
    });
    return next(newReq);
  }

  return next(req);
};
