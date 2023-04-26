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
  constructor(
    private cliente: Cliente,
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.cargarCliente();
  }

  create(): void {
    this.clienteService.create(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      swal(
        'Nuevo Cliente',
        `Cliente ${cliente.nombre} creado con exito!`,
        'success'
      );
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
    this.clienteService.update(this.cliente).subscribe((cliente) => {
      this.router.navigate(['/clientes']);
      swal(
        'Cliente Actualizado',
        `Cliente ${cliente.cliente.nombre} actualizado con exito!`,
        'success'
      );
    });
  }
}
