import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
@Injectable({
  providedIn: 'root',
})
export class BCryptService {
  saltRounds = 10;

  constructor() {}

  encodePassword(password: string): string {
    const salt = bcrypt.genSaltSync(this.saltRounds);
    const hash = bcrypt.hashSync(password, salt);
    return hash;
  }
}
