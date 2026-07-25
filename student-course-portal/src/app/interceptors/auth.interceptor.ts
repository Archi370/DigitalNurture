import { HttpInterceptorFn } from '@angular/common/http';

// Task 88: Auth Interceptor
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authReq = req.clone({
    setHeaders: {
      Authorization: 'Bearer mock-token-12345'
    }
  });
  return next(authReq);
};
