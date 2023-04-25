import { Component } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent {
  //private cliente: Cliente = new Cliente();

  constructor(
    private cliente: Cliente,
    private clienteService: ClienteService,
    private router: Router
  ) {}

  public create(): void {
    this.clienteService
      .create(this.cliente)
      .subscribe(() => this.router.navigate(['/clientes']));
  }

  public getCliente(): Cliente {
    return this.cliente;
  }

  titulo: string = 'Save or Update Client';
}
