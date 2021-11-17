import { of } from 'rxjs';
import { escenario } from './mocks/escenario';
import { reserva } from './mocks/reservas';

export class ReservaServiceStub {
  escenarioSeleccionado = escenario;
  horaSelecionada = { horaInicial: 18, isDisponible: true };

  consultarPorFechaAndIdEscenario() {
    return of([reserva]);
  }

  guardar() {
    return of(true);
  }
}
