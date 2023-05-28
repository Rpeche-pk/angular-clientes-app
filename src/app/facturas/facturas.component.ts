import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ClienteService } from '../clientes/cliente.service';
import { ActivatedRoute } from '@angular/router';

import { FormControl } from '@angular/forms';
import { Observable, flatMap, map, startWith } from 'rxjs';
import { FacturaService } from './services/factura.service';
import { Producto } from './models/producto';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { ItemFactura } from './models/item-factura';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
})
export class FacturasComponent implements OnInit {
  titulo: string = 'Nueva Factura';
  factura: Factura = new Factura();

  autocompleteControl = new FormControl('');

  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let clienteId = +params.get('clienteId');
      this.clienteService
        .getClienteById(clienteId)
        .subscribe((cliente) => (this.factura.cliente = cliente));
    });
    this.productosFiltrados = this.autocompleteControl.valueChanges.pipe(
      //al hacer click es como tener un caracter vacio y por ende el map hace el trabajo de
      //retornar un arreglo de string el cual sera un Observable<String[]>
      //startWith(''),

      //CUANDO ESCRIBIMOS ES UN STRING PERO CUANDO SLECCIONAMOS YA SE VUELVE UN OBJETO POR ELLO HACEMOS
      //DICHA VALIDACIÓN
      map((value: any | Producto) =>
        typeof value === 'string' ? value : value.nombre
      ),
      flatMap((value) => (value ? this._filter(value) : []))
    );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();

    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    let nuevoItem = new ItemFactura();
    nuevoItem.producto = producto;
    this.factura.items.push(nuevoItem);

    this.autocompleteControl.setValue('');
    event.option.focus();
    event.option.deselect();
  }
}
