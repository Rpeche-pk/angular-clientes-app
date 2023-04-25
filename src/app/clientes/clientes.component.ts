import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';

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
      .subscribe((clientes) => (this.clientes = clientes));
  }
}
