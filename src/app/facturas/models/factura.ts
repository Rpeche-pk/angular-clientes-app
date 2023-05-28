import { ItemFactura } from './item-factura';
import { Cliente } from 'src/app/clientes/cliente';

export class Factura {
  id: number;
  descripcion: string;
  obervacion: string;
  items: Array<ItemFactura> = [];
  cliente: Cliente;
  total: number;
  createAt: string;
}
