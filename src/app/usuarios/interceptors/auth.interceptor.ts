import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService, private router: Router) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((e) => {
        if (e.status == 401) {
          if (this.authService.isAuthenticated()) {
            this.authService.logout();
          }
          this.router.navigate(['/login']);
        }
        if (e.status == 403) {
          swal({
            title: 'No Autorizado',
            type: 'warning',
            text: `Oops ${this.authService.usuario.username}, ojito ojito ¡NO TIENES ACCESO!`,
            timer: 1700,
            position: 'top-end',
            showConfirmButton: false,
          });
          this.router.navigate(['/clientes']);
        }
        return throwError(() => e);
      })
    );
  }
}
