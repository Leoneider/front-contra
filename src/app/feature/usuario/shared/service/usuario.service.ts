import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(protected http: HttpService) {}

  public consultar() {
    return this.http.doGet<Usuario[]>(
      `${environment.endpointCore}/usuarios`,
      this.http.optsName('consultar usuarios')
    );
  }

  public consultarPorDocumento(documento: string) {
    return this.http.doGet<Usuario[]>(
      `${environment.endpointCore}/usuarios?documento=${documento}`,
      this.http.optsName('consultar usuarios')
    );
  }

  public guardar(usuario: Usuario) {
    return this.http.doPost<Usuario, boolean>(
      `${environment.endpointCore}/usuarios`,
      usuario,
      this.http.optsName('crear/actualizar usuarios')
    );
  }

  public eliminar(usuario: Usuario) {
    return this.http.doDelete<boolean>(
      `${environment.endpointCore}/usuarios/${usuario.id}`,
      this.http.optsName('eliminar usuarios')
    );
  }

  public login(documento: string, password: string) {
    return this.http
      .doGet<boolean>(
        `${environment.endpointCore}/usuarios?documento=${documento}&contrasena=${password}`,
        this.http.optsName('consultar usuarios')
      )
      .pipe(map((res) => (res[0] ? true : false)));
  }
}
