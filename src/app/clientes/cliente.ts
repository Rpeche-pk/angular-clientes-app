import { Injectable } from '@angular/core';
import { Region } from './region';
import { Factura } from '../facturas/models/factura';

@Injectable()
export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;
  foto: string;
  region: Region;
  facturas: Array<Factura> = [];
}
