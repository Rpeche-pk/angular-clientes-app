import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
})
export class ClientesComponent {
  clientes: Cliente[] = [];

  habilitar: boolean = true;

  setHabilitar(): void {
    this.habilitar = this.habilitar == true ? false : true;
  }

  //ES LO MISMO SI DECLARO LA PROPIEDAD COMO EN JAVA
  /* private clienteService: ClienteService
  constructor( clienteService: ClienteService) {
      this.clienteService= clienteService;
  }*/

  constructor(private clienteService: ClienteService) {}

  ngOnInit() {
    this.clienteService
      .getClientes()
      .pipe(
        tap((clientes) => {
          console.log('component cliente');
          clientes.forEach((cliente) => {
            console.log(cliente.nombre);
          });
        })
      )
      .subscribe((clientes) => (this.clientes = clientes));
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
        this.clienteService.delete(clientes.id).subscribe((response) => {
          this.clientes = this.clientes.filter((cli) => cli !== clientes);
          swal(
            'Cliente eliminado!',
            `Eliminado ${clientes.nombre} con éxito.`,
            'success'
          );
        });
      }
    });
  }
}
