import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Escenario } from '../model/escenario';

@Injectable({
  providedIn: 'root',
})
export class EscenarioService {
  constructor(protected http: HttpService) {}

  public consultar(limit:number = 9, offSet:number = 0 ) {
    return this.http.doGet<any>(
      `${environment.endpointCore}/escenarios?limit=${limit}&offSet=${offSet}`,
      this.http.optsName('consultar escenarios')
    );
  }

  public consultarPorNombre(filter:string) {
    return this.http.doGet<Escenario[]>(
      `${environment.endpointCore}/escenarios/buscar/${filter}`,
      this.http.optsName('Filtrar escenarios por nombre')
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
