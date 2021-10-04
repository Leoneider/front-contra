import { Component, OnInit } from "@angular/core";
import { Escenario } from "../../escenario/shared/model/escenario";
import { EscenarioService } from "../../escenario/shared/service/escenario.service";
import { HoraDisponible } from "../shared/model/hora-disponibles";
import { Reserva } from "../shared/model/reserva";
import { ReservaService } from "../shared/services/reserva.service";

@Component({
  selector: "app-apartar",
  templateUrl: "./apartar.component.html",
  styleUrls: ["./apartar.component.scss"],
})
export class ApartarComponent implements OnInit {
  escenario: Escenario;
  horasDisponibles: HoraDisponible[] = [];
  reservasDelEscenario: Reserva[] = [];

  horaSeleccionada: HoraDisponible = {
    horaInicial: 0,
    isDisponible: false,
  };

  constructor(
    private escenarioService: EscenarioService,
    private reservaService: ReservaService
  ) {}

  ngOnInit(): void {
    if (this.escenarioService.escenarioSeleccionado) {
      this.escenario = this.escenarioService.escenarioSeleccionado;
      this.calcularHorarioDisponible(
        this.escenario.horaInicial,
        this.escenario.horaFinal
      );
    }
  }

  async calcularHorarioDisponible(horaInicial: number, horaFinal: number) {
    await this.consultarReservas();
    for (let hora = horaInicial; hora <= horaFinal; hora++) {
      console.log("RESERVAS 2: ",this.reservasDelEscenario);
      
      let isReservada = this.reservasDelEscenario.map( res => res.hora).includes(hora);
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
    if(hora.isDisponible){
      this.horaSeleccionada = hora
      console.log("Esta es la hora seleccionada", hora);
    }
  }

  consultarReservas() {
    return new Promise<Reserva[]>((resolve) => {
      this.reservaService
      .consultarPorFechaAndIdEscenario("10-03-2021", 1)
      .subscribe((res) => {
        this.reservasDelEscenario = res;
        resolve (this.reservasDelEscenario);
      });
    })
  }

  get isSeleccionado() {
    return this.horaSeleccionada.horaInicial ? false : true;
  }
}
