import { Component } from '@angular/core';
import { AuthService } from '../usuarios/auth.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  title: string = 'DevCustomers';

  constructor(private _authService: AuthService, private router: Router) {}

  public get authService(): AuthService {
    return this._authService;
  }

  logout(): void {
    let username = this.authService.usuario.username;
    this._authService.logout();
    swal({
      title: 'Logout',
      type: 'success',
      text: `Hola ${username}, has cerrado sesión con éxito!`,
      timer: 1500,
      position: 'top-end',
      showConfirmButton: false,
    });
    this.router.navigate(['/login']);
  }
}
