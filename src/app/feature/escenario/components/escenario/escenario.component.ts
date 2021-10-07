import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Escenario } from '../../shared/model/escenario';

@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.component.html',
  styleUrls: ['./escenario.component.scss'],
})
export class EscenarioComponent implements OnInit {
  @Input() escenarios: Escenario[];
  @Output() selectEscenario = new EventEmitter<Escenario>();

  selectedEscenario: Escenario = {
    id: 0,
    nombre: '',
    direccion: '',
    valor: 0,
    horaInicial: 0,
    horaFinal: 0,
    imagen: '',
  };

  constructor() {}

  ngOnInit(): void {}

  seleccionar(e: Escenario) {
    this.selectedEscenario = e;
    this.selectEscenario.emit(this.selectedEscenario);
  }
}
