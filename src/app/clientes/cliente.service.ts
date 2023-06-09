import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Region } from './region';

@Injectable()
export class ClienteService {
  private urlEndPoint: string = 'http://localhost:8080/api/clientes';

  //private httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

  constructor(private http: HttpClient, private router: Router) {}

  /*private agregarAuthorizationHeader(): HttpHeaders {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization', `Bearer ${token}`);
    }
    return this.httpHeaders;
  }*/

  getRegiones(): Observable<Region[]> {
    return this.http.get<Region[]>(this.urlEndPoint + '/regiones');
  }

  getClientes(page: number): Observable<any> {
    //return of(clientes);
    //OPCION A: this.http.get<Cliente[]>(this.urlEndPoint)
    //OPCION B: .pipe(map((response) => response as Cliente[])) importando import { map } from 'rxjs/operators';
    return this.http.get(this.urlEndPoint + '/page/' + page).pipe(
      tap((response: any) => {
        console.log('TAP 1');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
      }),

      map((response: any) => {
        (response.content as Cliente[]).map((cliente) => {
          cliente.nombre = cliente.nombre.toUpperCase();
          /*cliente.createAt = formatDate(cliente.createAt,'dd-MM-YYYY','en-US');*/
          //let datePipe = new DatePipe('es');
          /*cliente.createAt = datePipe.transform( cliente.createAt,'EEEE  dd, MMMM yyyy');*/

          return cliente;
        });
        return response;
      }),
      tap((response) => {
        console.log('CLIENTE.SERVICE : TAP 2');
        (response.content as Cliente[]).forEach((cliente) => {
          console.log(cliente.nombre);
        });
      })
    );
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndPoint, cliente).pipe(
      map((response: any) => response.customer as Cliente),
      catchError((e) => {
        if (e.status === 400) {
          return throwError(() => e);
        }
        if (e.error.message) {
          console.error(e.error.message);
        }

        return throwError(() => e);
      })
    );
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.status != 401 && e.error.message) {
          this.router.navigate(['/clientes']);
          //ERROR QUE RETORNA DEL BACKEND , EN FORMATO MAP
          console.log(e.error.message);
        }

        return throwError(() => e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.urlEndPoint}/${cliente.id}`, cliente).pipe(
      catchError((e) => {
        if (e.status === 400) {
          return throwError(() => e);
        }
        if (e.error.message) {
          console.error(e.error.message);
        }

        return throwError(() => e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`).pipe(
      catchError((e) => {
        if (e.error.message) {
          console.error(e.error.message);
        }

        return throwError(() => e);
      })
    );
  }

  subirFoto(archivo: File, id: number): Observable<HttpEvent<{}>> {
    let formData = new FormData();
    formData.append('archivo', archivo);
    formData.append('id', id as unknown as string);

    const req = new HttpRequest(
      'POST',
      `${this.urlEndPoint}/upload`,
      formData,
      {
        reportProgress: true,
      }
    );

    return this.http.request(req);
  }
}
