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
  password = new FormControl('', [Validators.required]);

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
    this.inputSubscribeDocumento();
  }

  getEscenarioHoraSeleccionada() {
    this.escenarioSeleccionado = this.reservaService.escenarioSeleccionado;
    this.horaSelecionada = this.reservaService.horaSelecionada;
  }

  isLoadingConsulta = false;
  isHide = false;
  isUsuarioEncontrado = false;
  inputSubscribeDocumento() {
    this.documento.valueChanges
      .pipe(debounceTime(timeWait), distinctUntilChanged())
      .subscribe( async(documento: string) => {
       
        this.isLoadingConsulta = true;
        this.isUsuarioEncontrado = false;
        this.usuario = null;
        this.usuario = await this.consultaUsuarioPorDocumento(documento);
        if (this.usuario) {
          this.isUsuarioEncontrado = true;
        }
        this.isHide = true
      });
  }

  consultaUsuarioPorDocumento(documento: string) {
    return new Promise<Usuario>((resolve) => {
      this.usuarioService.consultarPorDocumento(documento).subscribe((user) => {
          this.isLoadingConsulta = false;
          resolve(user[0])     
      });
    })
  }

  confirmar() {
    if (this.isUsuarioEncontrado) {
      this.guardarReservaUsuarioExistente();
    } else {
      this.guardarReservaUsuarioNuevo();
    }
  }

  async guardarReservaUsuarioExistente() {
    let isLogado = await this.loginUser();
    if (isLogado) {
      this.guardarReserva();
    } else {
      this.notificationService.showError(
        'El documento o la contraseña son incorrectos'
      );
    }
  }

  async guardarReservaUsuarioNuevo() {
    if (await this.guardarUsuario()) {
      this.guardarReserva();
    }
  }

  async guardarUsuario() {
    let data = {
      ...this.userForm.value,
      documento: this.documento.value,
    };
    return new Promise<boolean>((resolve) => {
      this.usuarioService.guardar(data).subscribe(async (res) => {
        this.usuario = await this.consultaUsuarioPorDocumento(this.documento.value);
        if (await this.loginUser()) {
          resolve(res);
        }
      }, error => {
        this.notificationService.showError(
          error.error.mensaje
        );
      });
    });
  }

  loginUser() {
    return new Promise<boolean>((resolve) => {
      this.usuarioService
        .login(this.documento.value, this.password.value)
        .subscribe((data) => {
          localStorage.setItem('user', JSON.stringify(this.usuario));
          resolve(data);
        });
    });
  }

  guardarReserva() {
    let reserva: Reserva = {
      fecha: this.reservaService.fechaSeleccionada,
      hora: this.reservaService.horaSelecionada.horaInicial,
      estado: 'RESERVADO',
      valor: this.reservaService.escenarioSeleccionado.valor,
      escenarioId: this.reservaService.escenarioSeleccionado.id,
      usuarioId: this.usuario.id,
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



  userForm: FormGroup = new FormGroup({
    nombres: new FormControl('', [Validators.required]),
  });

  getFormUsuario(userForm: FormGroup) {
    this.userForm = userForm;
  }

  get habilitarBoton() {
    if (this.isUsuarioEncontrado) {
      return false;
    }
    return this.userForm.invalid;
  }
}
