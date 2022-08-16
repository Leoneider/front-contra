import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Escenario } from '../model/escenario';

@Injectable({
  providedIn: 'root',
})
export class EscenarioService {
  constructor(protected http: HttpService) {}

  public consultar() {
    const limit = 10;
    const offset = 0
    return this.http.doGet<any>(
      `${environment.endpointCore}/escenarios?limit=${limit}&offSet=${offset}`,
      this.http.optsName('consultar escenarios')
    );
  }

  public guardar(producto: Escenario) {
    return this.http.doPost<Escenario, boolean>(
      `${environment.endpointCore}/escenarios`,
      producto,
      this.http.optsName('crear/actualizar escenarios')
    );
  }

  public eliminar(producto: Escenario) {
    return this.http.doDelete<boolean>(
      `${environment.endpointCore}/escenarios/${producto.id}`,
      this.http.optsName('eliminar escenarios')
    );
  }
}
