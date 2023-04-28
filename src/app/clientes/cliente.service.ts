import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { formatDate, DatePipe } from '@angular/common';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  getClientes(): Observable<Cliente[]> {
    //return of(clientes);
    //OPCION A: this.http.get<Cliente[]>(this.urlEndPoint)
    //OPCION B: .pipe(map((response) => response as Cliente[])) importando import { map } from 'rxjs/operators';
    return this.http.get(this.urlEndPoint).pipe(
      tap((response) => {
        let clientes = response as Cliente[];
        console.log('TAP 1');
        clientes.forEach((cliente) => {
          console.log(cliente.nombre);
        });
      }),

      map((response) => {
        let clientes = response as Cliente[];
        return clientes.map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          /*cliente.createAt = formatDate(cliente.createAt,'dd-MM-YYYY','en-US');*/
          //let datePipe = new DatePipe('es');
          /*cliente.createAt = datePipe.transform( cliente.createAt,'EEEE  dd, MMMM yyyy');*/

          return cliente;
        });
      }),
      tap((response) => {
        console.log('CLIENTE.SERVICE : TAP 2');
        response.forEach((cliente) => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http
      .post<Cliente>(this.urlEndPoint, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        map((response: any) => response.customer as Cliente),
        catchError((e) => {
          if (e.status === 400) {
            return throwError(() => e);
          }

          console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  getClienteById(id: string): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        this.router.navigate(['/clientes']);
        console.log(e.error.message);
        swal(e.error.message, e.error.error, 'error');
        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http
      .put(`${this.urlEndPoint}/${cliente.id}`, cliente, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          if (e.status === 400) {
            return throwError(() => e);
          }
          console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }

  delete(id: number): Observable<Cliente> {
    return this.http
      .delete<Cliente>(`${this.urlEndPoint}/${id}`, {
        headers: this.httpHeaders,
      })
      .pipe(
        catchError((e) => {
          console.error(e.error.message);
          swal(e.error.message, e.error.error, 'error');
          return throwError(() => e);
        })
      );
  }
}
