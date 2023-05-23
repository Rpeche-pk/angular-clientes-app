import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent {
  titulo: string = 'Registrate ahora!!';
  usuario: Usuario;
  public errores: string[];

  constructor(private authService: AuthService, private router: Router) {
    this.usuario = new Usuario();
  }

  registrarUsuario(): void {
    //IMPLEMENTAMOS EL REGISTRAR Y QUE ENTRE A LA PAGINA PRINCIPAL
    this.authService.registrarUsuario(this.usuario).subscribe({
      next: (response) => {
        this.authService.login(this.usuario).subscribe((response) => {
          console.log(response);

          this.authService.guardarUsuario(response.access_token);
          this.authService.guardarToken(response.access_token);

          let usuario = this.authService.usuario;
          this.router.navigate(['/clientes']);
          swal(
            'Login',
            `Hola ${usuario.username} ${usuario.apellido}, has iniciado sesion con exito!`,
            'success'
          );
        });
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
        console.error('codigo de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      },
    });
  }
}
