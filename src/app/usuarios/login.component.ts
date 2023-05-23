import { Component, OnInit } from '@angular/core';
import { Usuario } from './usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnInit {
  titulo: string = 'Por favor, Inicia Sesión';
  usuario: Usuario;

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      swal({
        title: 'Login',
        type: 'info',
        text: `Hola ${this.authService.usuario.username} ya estas autenticado!`,
        timer: 1000,
        position: 'top-end',
        showConfirmButton: false,
      });

      this.router.navigate(['/clientes']);
    }
  }

  login(): void {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal('Error Login', 'Username or password incorrect', 'error');
      return;
    }
    this.authService.login(this.usuario).subscribe({
      next: (response) => {
        console.log(response);

        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);

        let usuario = this.authService.usuario;
        this.router.navigate(['/clientes']);
        swal(
          'Login',
          `Hola ${usuario.username}, has iniciado sesion con exito!`,
          'success'
        );
      },
      error: (err) => {
        if (err.status == 400) {
          swal('Error Login', 'Username or password incorrect', 'error');
        }
      },
    });
  }
}
