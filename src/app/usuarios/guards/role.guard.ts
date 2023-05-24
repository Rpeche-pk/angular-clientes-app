import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /**
     * preguntando si no estamos autenticados....
     */
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = route.data['role'] as string;
    console.log('ROLES->>>>' + role);

    let hasRole = false;
    Array.from(role).forEach((role) => {
      if (this.authService.hasRole(role)) {
        hasRole = true;
      }
    });

    if (hasRole) {
      return true;
    }

    swal({
      title: 'No Autorizado',
      type: 'warning',
      text: `Oops ${this.authService.usuario.username}, ojito ojito ¡NO TIENES ACCESO!`,
      timer: 1700,
      position: 'top-end',
      showConfirmButton: false,
    });
    this.router.navigate(['/clientes']);

    return false;
  }
}
