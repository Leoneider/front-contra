import { Component, OnInit } from '@angular/core';
import { Escenario } from '../../escenario/shared/model/escenario';
import { EscenarioService } from '../../escenario/shared/service/escenario.service';
import { HoraDisponible } from '../shared/model/hora-disponibles';

@Component({
  selector: 'app-apartar',
  templateUrl: './apartar.component.html',
  styleUrls: ['./apartar.component.scss']
})
export class ApartarComponent implements OnInit {
  escenario:Escenario;
  horasDisponibles:HoraDisponible[] = [];

  horaSeleccionada:HoraDisponible = {
    horaInicial: 0,
    isDisponible: false

  };

  constructor(private escenarioService: EscenarioService) { }


  ngOnInit(): void {
    if(this.escenarioService.escenarioSeleccionado){
      this.escenario = this.escenarioService.escenarioSeleccionado
      this.calcularHorarioDisponible(this.escenario.horaInicial, this.escenario.horaFinal)
    }

    }
   

  calcularHorarioDisponible(horaInicial:number, horaFinal:number){
    for (let hora = horaInicial; hora <= horaFinal; hora++) {
      let horaDisponible:HoraDisponible = {horaInicial: 0,
      isDisponible: false};
      horaDisponible.horaInicial = hora;
      horaDisponible.isDisponible = true;
      this.horasDisponibles.push(horaDisponible)
    }
  }

  seleccionarHora(hora:HoraDisponible){
    this.horaSeleccionada = hora,
   console.log("Esta es la hora seleccionada", hora);
   

  }

  get isSeleccionado(){
    return this.horaSeleccionada.horaInicial ? false : true;
  }



}
