import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { AnimationItem } from 'lottie-web';
import { AnimationOptions } from 'ngx-lottie';
import { Escenario } from '../../shared/model/escenario';


@Component({
  selector: 'app-escenario',
  templateUrl: './escenario.component.html',
  styleUrls: ['./escenario.component.scss'],
})
export class EscenarioComponent {
  @Input() escenarios: Escenario[] = [];
  @Input() length: number;

  @Output() selectEscenario = new EventEmitter<Escenario>();
  @Output() filterEscenario = new EventEmitter<string>();
  @Output() listEscenarioPaginable = new EventEmitter<PageEvent>();
  

  stringFilter = new FormControl('');
  existenEscenario = false;
  selectedEscenario: Escenario = {
    id: 0,
    nombre: '',
    direccion: '',
    valor: 0,
    horaInicial: 0,
    horaFinal: 0,
    imagen: '',
  };

   pageSize = 9;
   // MatPaginator Output
   pageEvent: PageEvent;
 

  constructor() {
   
  }

  options: AnimationOptions = {
    path: '/assets/search.json',
  };

  animationCreated(animationItem: AnimationItem): void {
    console.log(animationItem);
  }

  seleccionar(e: Escenario) {
    this.selectedEscenario = e;
    this.selectEscenario.emit(this.selectedEscenario);
  }

  filterBuscado: string;
  buscarEscenario() {
    this.filterEscenario.emit(this.stringFilter.value);
    this.filterBuscado = this.stringFilter.value;
  }

  getServerData(event){
    this.pageEvent = event;
    this.listEscenarioPaginable.emit(this.pageEvent)
  }


}
