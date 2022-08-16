import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '@core/services/notification.service';
import { Escenario } from '../../escenario/shared/model/escenario';
import { EscenarioService } from '../../escenario/shared/service/escenario.service';
import { ReservaService } from '../../reserva/shared/services/reserva.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  escenarios: Escenario[] = [];
  escenarioSeleccionado: Escenario;

  constructor(
    private readonly router: Router,
    private escenarioService: EscenarioService,
    private reservaService: ReservaService,
    private notificationService: NotificationService
  ) {}

  ngOnInit() {
    this.obtenerEscenarios();
  }

  obtenerEscenarios() {
    this.escenarioService.consultar().subscribe((res) => {
      this.escenarios = res.content;
    });
  }

  sellecionarEscenario(escenario: Escenario) {
    this.escenarioSeleccionado = escenario;
  }

  apartarEscenario() {
    if (this.escenarioSeleccionado) {
      this.reservaService.escenarioSeleccionado = this.escenarioSeleccionado;
      this.redirectReserva();
    } else {
      this.notificationService.showError('Debe seleccionar una escenario');
    }
  }

  redirectReserva(): void {
    this.router.navigateByUrl('reservar');
  }

  get isSeleccionado() {
    return this.escenarioSeleccionado ? false : true;
  }
}
