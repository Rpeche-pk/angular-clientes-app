import { Injectable } from '@angular/core';
import { Region } from './region';

@Injectable()
export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  createAt: string;
  email: string;
  foto: string;
  region: Region;
}
