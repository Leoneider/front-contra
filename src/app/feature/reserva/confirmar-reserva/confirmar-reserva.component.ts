import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Escenario } from '../../escenario/shared/model/escenario';
import { Usuario } from '../../usuario/shared/model/usuario';
import { UsuarioService } from '../../usuario/shared/service/usuario.service';
import { HoraDisponible } from '../shared/model/hora-disponibles';
import { Reserva } from '../shared/model/reserva';
import { ReservaService } from '../shared/services/reserva.service';
const timeWait = 1500;

@Component({
  selector: 'app-confirmar-reserva',
  templateUrl: './confirmar-reserva.component.html',
  styleUrls: ['./confirmar-reserva.component.scss'],
})
export class ConfirmarReservaComponent implements OnInit {

  escenarioSeleccionado: Escenario;
  horaSelecionada: HoraDisponible;
  usuario: Usuario;
  

  documento = new FormControl('', [Validators.required]);

  constructor(
    public router: Router,
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
      .pipe(debounceTime(timeWait), distinctUntilChanged())
      .subscribe((res: string) => {
        this.isLoadingConsulta = true;
        this.isUsuarioEncontrado = false;
        this.usuario = null;
        this.usuarioService
          .consultarPorDocumento(res)
          .subscribe((user) => {
            this.isLoadingConsulta = false;
            if (res[0]) {
              this.usuario = user[0];
              this.isUsuarioEncontrado = true;
            }
          });
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

        this.router.navigateByUrl('/usuario/perfil');
      }
    });
  }

  async guardarUsuario() {
    let data = {
      ...this.userForm.value,
      documento: this.documento.value,
    };

    return new Promise<boolean>((resolve) => {
      this.usuarioService.guardar(data).subscribe((res) => {
        resolve(res);
      });
    });
  }

  userForm:FormGroup = new FormGroup({nombres: new FormControl('', [Validators.required])});
  getFormUsuario(userForm:FormGroup){
    this.userForm = userForm
  }

  get habilitarBoton() {
    if (this.isUsuarioEncontrado) {
      return false;
    }
    return this.userForm.invalid;
  }
}
