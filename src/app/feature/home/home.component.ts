import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { Escenario } from '../escenario/shared/model/escenario';
import { EscenarioService } from '../escenario/shared/service/escenario.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  
  escenarios:Escenario[] = [];
  escenarioSeleccionado:Escenario;

  constructor(private readonly router: Router,
     private escenarioService: EscenarioService,
     private notificationService: NotificationService) { 

  }

  ngOnInit() {
    this.obtenerEscenarios();
  }


  obtenerEscenarios(){
    this.escenarioService.consultar().subscribe( res => {
      this.escenarios = res;
    })
  }

  sellecionarEscenario(escenario: Escenario){
    this.escenarioSeleccionado = escenario
  }

  apartarEscenario(){
    if(this.escenarioSeleccionado){
      this.escenarioService.escenarioSeleccionado = this.escenarioSeleccionado;
      this.router.navigateByUrl('/reservar');
    }else{
      this.notificationService.showError('Debe seleccionar una escenario')
    }
  }

 

  get isSeleccionado(){
    return this.escenarioSeleccionado ? false : true;
  }

}
