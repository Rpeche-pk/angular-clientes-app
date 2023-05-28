import { Component, OnInit } from '@angular/core';
import { Factura } from './models/factura';
import { ActivatedRoute } from '@angular/router';
import { FacturaService } from './services/factura.service';

@Component({
  selector: 'app-detalle-factura',
  templateUrl: './detalle-factura.component.html',
})
export class DetalleFacturaComponent implements OnInit {
  factura: Factura;
  titulo: string = 'Factura';

  constructor(
    private facturaService: FacturaService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params) => {
      let id = +params.get('id');
      this.facturaService.getFacturas(id).subscribe((factura) => {
        this.factura = factura;
      });
    });
  }
}
