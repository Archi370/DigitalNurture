import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

// Task 90: Error Handler Interceptor
export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.warn('Unauthorized request - redirecting to home');
        router.navigate(['/']);
      } else if (error.status === 500) {
        console.error('Server Error 500:', error.message);
      }
      return throwError(() => error);
    })
  );
};
