import { Component, Input, OnInit } from '@angular/core';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';
import { ModalService } from './modal.service';
import { AuthService } from 'src/app/usuarios/auth.service';

@Component({
  selector: 'detalle-cliente',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css'],
})
export class DetalleComponent implements OnInit {
  @Input() public cliente: Cliente;
  public titulo: string = 'Detalles del Cliente';
  public fotoSeleccionada: File;
  public progreso: number = 0;

  constructor(
    private clienteService: ClienteService,
    private modalService: ModalService,
    private _authService: AuthService
  ) {}

  public get authService(): AuthService {
    return this._authService;
  }

  get getModalService(): ModalService {
    return this.modalService;
  }

  ngOnInit(): void {}

  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal(
        'Errorr: tipo de archivo',
        'El archivo debe ser de tipo imagen',
        'error'
      );
      this.fotoSeleccionada = undefined;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal('Errorr: upload', 'debe seleccionar una foto', 'error');
    } else {
      this.clienteService
        .subirFoto(this.fotoSeleccionada, this.cliente.id)
        .subscribe((event) => {
          //
          if (event.type === HttpEventType.UploadProgress) {
            this.progreso = Math.round((event.loaded / event.total) * 100);
          } else if (event.type === HttpEventType.Response) {
            let response: any = event.body;
            this.cliente = response.cliente as Cliente;

            //LANZAMOS EL EVENTO DEL CLIENTE Y DENTRO DE ELLO SU FOTO ESTE IRA PARA QUE ALGUN SERVICIO SE SUSCRIBA
            this.modalService.notificarUpload.emit(this.cliente);
            swal(
              'La foto se ha subido correctamente!',
              response.mensaje,
              'success'
            );
          }
        });
    }
  }
  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = undefined;
    this.progreso = 0;
  }
}
