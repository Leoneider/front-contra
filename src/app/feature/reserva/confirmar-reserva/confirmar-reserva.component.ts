import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NotificationService } from '@core/services/notification.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Escenario } from '../../escenario/shared/model/escenario';
import { FormUsuarioComponent } from '../../usuario/components/form-usuario/form-usuario.component';
import { Usuario } from '../../usuario/shared/model/usuario';
import { UsuarioService } from '../../usuario/shared/service/usuario.service';
import { HoraDisponible } from '../shared/model/hora-disponibles';
import { Reserva } from '../shared/model/reserva';
import { ReservaService } from '../shared/services/reserva.service';

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrls: ['./confirmar-reserva.component.scss'],
})
export class ConfirmarReservaComponent implements OnInit {
  @ViewChild(FormUsuarioComponent) usuarioForm: FormUsuarioComponent;

  escenarioSeleccionado: Escenario;
  horaSelecionada: HoraDisponible;
  usuario: Usuario;

  documento = new FormControl('', [Validators.required]);

  constructor(
    private reservaService: ReservaService,
    private usuarioService: UsuarioService,
    private notificationService: NotificationService
  ) {
    this.usuario = {
      id: 0,
      documento: '',
      nombres: '',
      apellidos: '',
      celular: '',
      email: '',
      fehca_nacimiento: '',
      contrasena: '',
    };
  }

  ngOnInit(): void {
    this.getEscenarioHoraSeleccionada();
    this.consultarDocumento();
  }

  getEscenarioHoraSeleccionada() {
    this.escenarioSeleccionado = this.reservaService.escenarioSeleccionado;
    this.horaSelecionada = this.reservaService.horaSelecionada;
  }

  isLoadingConsulta: boolean;
  isUsuarioEncontrado = false;
  consultarDocumento() {
    this.documento.valueChanges
      .pipe(debounceTime(2000), distinctUntilChanged())
      .subscribe((res) => {
        this.isLoadingConsulta = true;
        this.isUsuarioEncontrado = false;
        this.usuario = null;
        this.usuarioService.consultarPorDocumento(res).subscribe(
          (res) => {
            this.isLoadingConsulta = false;
            if (res[0]) {
              this.usuario = res[0];
              this.isUsuarioEncontrado = true;
            }
          },
          (err) => {
            new Error(err);
            this.isLoadingConsulta = false;
          }
        );
      });
  }

  async confirmar() {
    if (this.isUsuarioEncontrado) {
      this.guardarReserva();
    }

    if (await this.guardarUsuario()) {
      this.guardarReserva();
    }
  }

  guardarReserva() {
    console.log(
      this.reservaService.escenarioSeleccionado.id,
      this.reservaService.horaSelecionada.horaInicial,
      this.reservaService.escenarioSeleccionado.valor
    );

    let reserva: Reserva = {
      id: 0,
      fecha: '10-04-2021',
      hora: this.reservaService.horaSelecionada.horaInicial,
      estado: 'RESERVADO',
      valor: this.reservaService.escenarioSeleccionado.valor,
      escenario_id: this.reservaService.escenarioSeleccionado.id,
    };

    this.reservaService.guardar(reserva).subscribe((res) => {
      if (res) {
        this.notificationService.showSucces(
          'Se ha realizado la reserva, te esperamos en el juego'
        );
      }
    });
  }

  async guardarUsuario() {
    let data = {
      ...this.usuarioForm.usuarioForm.value,
      documento: this.documento.value,
    };

    return new Promise<boolean>((resolve) => {
      this.usuarioService.guardar(data).subscribe((res) => {
        resolve(res);
      });
    });
  }

  get habilitarBoton() {
    if (this.isUsuarioEncontrado) {
      return false;
    }
    if (this.usuarioForm) {
      return this.usuarioForm.usuarioForm.invalid;
    }
    return true;
  }
}
