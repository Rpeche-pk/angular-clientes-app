import { Component } from '@angular/core';

@Component({
  selector: 'app-directiva',
  templateUrl: './directiva.component.html',
})
export class DirectivaComponent {
  listaCursos: string[] = [
    'TypeSctipt',
    'JavaScript',
    'Java SE',
    'C#',
    'Python',
  ];
  habilitar: boolean = true;

  setHabilitar(): void {
    this.habilitar = this.habilitar == true ? false : true;
  }

  constructor() {}
}
