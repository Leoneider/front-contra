import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { Escenario } from 'src/app/feature/escenario/shared/model/escenario';
import { environment } from 'src/environments/environment';
import { HoraDisponible } from '../model/hora-disponibles';
import { Reserva } from '../model/reserva';

@Injectable({
  providedIn: 'root',
})
export class ReservaService {
  reserva: Reserva;
  escenarioSeleccionado: Escenario;
  horaSelecionada: HoraDisponible;
  fechaSeleccionada: string;

  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Reserva[]>(
      `${environment.endpointCore}/reserva`,
      this.http.optsName('consultar reservas')
    );
  }

  public consultarPorFechaAndIdEscenario(fecha: string, idEscenario: number) {
    return this.http.doGet<Reserva[]>(
      `${environment.endpointCore}/reservas/escenario/${idEscenario}/fecha/${fecha}`,
      this.http.optsName('consultar reservas por fecha y escenario')
    );
  }

  public consultarPorIdUsuario(idUsuario: number) {
    return this.http.doGet<Reserva[]>(
      `${environment.endpointCore}/reservas/usuario/${idUsuario}`,
      this.http.optsName('consultar reservas por usuario')
    );
  }

  public guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, boolean>(
      `${environment.endpointCore}/reservas`,
      reserva,
      this.http.optsName('crear/actualizar reservas')
    );
  }

  public eliminar(reserva: Reserva) {
    return this.http.doDelete<boolean>(
      `${environment.endpointCore}/reserva/${reserva.id}`,
      this.http.optsName('eliminar reservas')
    );
  }
}
