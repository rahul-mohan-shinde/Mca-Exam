import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Step 1: Get token from storage
    const token = this.authService.getToken();

    // Step 2: Clone request and add authorization header
    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    // Step 3: Handle response
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        // Step 3.1: Handle 401 errors
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        }

        // Step 3.2: Return error
        return throwError(() => error);
      })
    );
  }
}

