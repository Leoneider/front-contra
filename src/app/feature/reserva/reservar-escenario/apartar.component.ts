import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { Escenario } from '../../escenario/shared/model/escenario';
import { HoraDisponible } from '../shared/model/hora-disponibles';
import { Reserva } from '../shared/model/reserva';
import { ReservaService } from '../shared/services/reserva.service';

@Component({
  selector: 'app-apartar',
  templateUrl: './apartar.component.html',
  styleUrls: ['./apartar.component.scss'],
})
export class ApartarComponent implements OnInit {
  escenario: Escenario;
  horasDisponibles: HoraDisponible[] = [];
  reservasDelEscenario: Reserva[] = [];

  horaSeleccionada: HoraDisponible;

  constructor(
    private readonly router: Router,
    private notificationService: NotificationService,
    public reservaService: ReservaService
  ) {
    this.horaSeleccionada = {
      horaInicial: 0,
      isDisponible: false,
    };
  }

  ngOnInit(): void {
    if (this.reservaService.escenarioSeleccionado) {
      this.escenario = this.reservaService.escenarioSeleccionado;
      this.calcularHorarioDisponible(
        this.escenario.horaInicial,
        this.escenario.horaFinal
      );
    }
  }

  async calcularHorarioDisponible(horaInicial: number, horaFinal: number) {
    await this.consultarReservas();
    for (let hora = horaInicial; hora <= horaFinal; hora++) {
      let isReservada = this.reservasDelEscenario
        .map((res) => res.hora)
        .includes(hora);

      let horaDisponible: HoraDisponible = {
        horaInicial: 0,
        isDisponible: false,
      };

      horaDisponible.horaInicial = hora;
      horaDisponible.isDisponible = !isReservada;
      this.horasDisponibles.push(horaDisponible);
    }
  }

  seleccionarHora(hora: HoraDisponible) {
    if (hora.isDisponible) {
      this.horaSeleccionada = hora;
    }
  }

  consultarReservas() {
    return new Promise<Reserva[]>((resolve) => {
      this.reservaService
        .consultarPorFechaAndIdEscenario('10-04-2021', this.escenario.id)
        .subscribe((res) => {
          this.reservasDelEscenario = res;
          resolve(this.reservasDelEscenario);
        });
    });
  }

  confirmarHora() {
    if (this.horaSeleccionada.horaInicial) {
      this.reservaService.horaSelecionada = this.horaSeleccionada;
      this.redirectConfirm();
    } else {
      this.notificationService.showError('Debe seleccionar una escenario');
    }
  }

  redirectConfirm(){
    this.router.navigateByUrl('/reservar/confirmar');
  }
    


  get isSeleccionado() {
    return this.horaSeleccionada.horaInicial ? false : true;
  }
}
