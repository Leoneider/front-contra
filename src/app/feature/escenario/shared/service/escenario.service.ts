import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Escenario } from '../model/escenario';

@Injectable({
  providedIn: 'root'
})
export class EscenarioService {
  escenarioSeleccionado:Escenario;
  
  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Escenario[]>(`${environment.endpoint}/escenario`, this.http.optsName('consultar escenarios'));
  }

  public guardar(producto: Escenario) {
    return this.http.doPost<Escenario, boolean>(`${environment.endpoint}/escenario`, producto,
                                                this.http.optsName('crear/actualizar escenarios'));
  }

  public eliminar(producto: Escenario) {
    return this.http.doDelete<boolean>(`${environment.endpoint}/escenario/${producto.id}`,
                                                 this.http.optsName('eliminar escenarios'));
  }
}
