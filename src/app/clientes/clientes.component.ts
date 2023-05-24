import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalService } from './detalle/modal.service';
import { AuthService } from '../usuarios/auth.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {
  clientes: Cliente[] = [];
  paginador: any;
  clienteSeleccionado: Cliente;

  habilitar: boolean = true;

  setHabilitar(): void {
    this.habilitar = this.habilitar == true ? false : true;
  }

  //ES LO MISMO SI DECLARO LA PROPIEDAD COMO EN JAVA
  /* private clienteService: ClienteService
  constructor( clienteService: ClienteService) {
      this.clienteService= clienteService;
  }*/

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: ModalService,
    private _authService: AuthService
  ) {}

  public get authService(): AuthService {
    return this._authService;
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe((params) => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService
        .getClientes(page)
        .pipe(
          tap((response: any) => {
            console.log('component cliente');
            (response.content as Cliente[]).forEach((cliente) => {
              console.log(cliente.nombre);
            });
          })
        )
        .subscribe((response) => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
          let totalPages: number = +this.paginador.totalPages;
          if (totalPages < page) {
            swal(
              'Error!',

              `La página del paginador ${page} no existe.`,

              'error'
            );
            this.router.navigate(['/clientes/page/0']);
          }
        });
    });

    this.modalService.notificarUpload.subscribe((cliente) => {
      this.clienteSeleccionado.foto = cliente.foto;
      /* this.clientes = this.clientes.map((clienteOriginal) => {
        if (cliente.id == clienteOriginal.id) {
          clienteOriginal.foto = cliente.foto;
        }
        return clienteOriginal;
      });*/
    });
  }

  delete(clientes: Cliente): void {
    swal({
      title: 'Esta Seguro?',
      text: `¿Seguro que quiere eliminar al cliente ${clientes.nombre} ${clientes.apellido}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonClass: 'btn btn-danger',
      confirmButtonText: 'Si, eliminar!',
      cancelButtonText: 'No, cancelar',
    } as any).then((result) => {
      if (result.value) {
        this.clienteService.delete(clientes.id).subscribe({
          next: (response) => {
            this.clientes = this.clientes.filter((cli) => cli !== clientes);
            swal(
              'Cliente eliminado!',
              `Eliminado ${clientes.nombre} con éxito.`,
              'success'
            );
          },
          /*error: (err) => {
            swal('Error!', 'Oops. No se pudo eliminar', 'error');
          },*/
        });
      }
    });
  }

  abrirModal(cliente: Cliente) {
    this.clienteSeleccionado = cliente;
    this.modalService.abrirModal();
  }
}
