import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'clientes-app';
  curso: string = 'Curso de Angular';
  profesor: string = 'Andres Guzman';
}
