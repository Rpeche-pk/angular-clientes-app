import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {
  //private cliente: Cliente = new Cliente();
  titulo: string = 'Save or Update Client';
  private errores: string[];

  constructor(
    private cliente: Cliente,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  get errs(): string[] {
    return this.errores;
  }

  /**
   * Nueva Forma de manejar un sucribe con nestx, error and complete
   */
  create(): void {
    this.clienteService.create(this.cliente).subscribe({
      next: (cliente) => {
        swal(
          'Nuevo Cliente',
          `Cliente ${cliente.nombre} creado con exito!`,
          'success'
        );
      },
      error: (err) => {
        this.errores = err.error.errors as string[];
        console.error('codigo de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      },
      complete: () => {
        this.router.navigate(['/clientes']);
      },
    });
  }

  //TRAYENDO EL CLIENTE CON LA PALABRA RESERVADA GET DE UN ATRIBUTO PRIVADO
  get cli(): Cliente {
    return this.cliente;
  }

  getCliente(): Cliente {
    return this.cliente;
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe((params) => {
      let id = params['id'];
      if (id) {
        this.clienteService
          .getClienteById(id)
          .subscribe((cliente) => (this.cliente = cliente));
      }
    });
  }

  update(): void {
    this.clienteService.update(this.cliente).subscribe(
      (cliente) => {
        this.router.navigate(['/clientes']);
        swal(
          'Cliente Actualizado',
          `Cliente ${cliente.cliente.nombre} actualizado con exito!`,
          'success'
        );
      },
      (err) => {
        this.errores = err.error.errors as string[];
        console.error('codigo de error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
