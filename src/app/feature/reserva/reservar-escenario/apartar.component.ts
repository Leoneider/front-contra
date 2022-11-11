import { animate, style, transition, trigger } from '@angular/animations';
import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { AnimationOptions } from 'ngx-lottie';
import { Escenario } from '../../escenario/shared/model/escenario';
// import { Dia } from '../shared/model/dia';
import { HoraDisponible } from '../shared/model/hora-disponibles';
import { Reserva } from '../shared/model/reserva';
import { ReservaService } from '../shared/services/reserva.service';

@Component({
  selector: 'app-apartar',
  templateUrl: './apartar.component.html',
  styleUrls: ['./apartar.component.scss'],
  animations: [
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1 })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
  ],
})
export class ApartarComponent implements OnInit {
  escenario: Escenario;
  horasDisponibles: HoraDisponible[] = [];
  reservasDelEscenario: Reserva[] = [];

  horaSeleccionada: HoraDisponible;

  fechaSeleccionada = new FormControl('');
  fechaActual: string;

  fechaMinimaDeReserva: Date;

  options: AnimationOptions = {
    path: '/assets/loading.json',
  };

  constructor(
    private readonly router: Router,
    private notificationService: NotificationService,
    public reservaService: ReservaService,
    private datePipe: DatePipe
  ) {
    this.horaSeleccionada = {
      horaInicial: 0,
      isDisponible: false,
    };

    this.fechaActual = this.datePipe.transform(
      new Date().toISOString(),
      'yyyy-MM-dd'
    );

    this.fechaMinimaDeReserva = new Date(
      this.returnDateMinimaParaReserva(this.fechaActual)
    );
    this.fechaSeleccionada.setValue(new Date());
  }

  ngOnInit(): void {
    this.getHorario();
  }

  returnDateMinimaParaReserva(date: string, splitChar: string = '-') {
    let fecha: string[] = date.split(splitChar);
    let anio = +fecha[0];
    let mes = +fecha[1] - 1;
    let dia = +fecha[2];
    return new Date(anio, mes, dia);
  }

  fechaSeleccionadaChange(event) {
    this.fechaSeleccionada.setValue(event);
    console.log(this.fechaSeleccionada.value);
    this.horasDisponibles = [];
    this.getHorario();
  }
  


  getHorario() {
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
    setTimeout(() => {
      
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
    }, 500);
    

    
  }

  seleccionarHora(hora: HoraDisponible) {
    if (hora.isDisponible) {
      this.horaSeleccionada = hora;
    }
  }

  consultarReservas() {
    return new Promise<Reserva[]>((resolve) => {
      this.reservaService
        .consultarPorFechaAndIdEscenario(
          this.datePipe.transform(
            this.fechaSeleccionada.value.toISOString(),
            'yyyy-MM-dd'
          ),
          this.escenario.id
        )
        .subscribe((res) => {
          this.reservasDelEscenario = res;
          resolve(this.reservasDelEscenario);
        });
    });
  }

  confirmarHora() {
    this.reservaService.fechaSeleccionada = this.datePipe.transform(
      this.fechaSeleccionada.value,
      'yyyy-MM-dd'
    );

    if (this.horaSeleccionada.horaInicial) {
      this.reservaService.horaSelecionada = this.horaSeleccionada;
      this.redirectConfirm();
    } else {
      this.notificationService.showError('Debe seleccionar una escenario');
    }
  }

  redirectConfirm() {
    this.router.navigateByUrl('/reservar/confirmar');
  }

  get isSeleccionado() {
    return this.horaSeleccionada.horaInicial ? false : true;
  }
}
