import { of } from 'rxjs';
import { usuario } from './mocks/usuario';

export class UsuarioServiceStub {
  login() {
    return of([usuario]);
  }

  guardar() {
    return of({
      name: 'morpheus',
      job: 'leader',
      id: '808',
      createdAt: '2021-04-14T22:22:44.163Z',
    });
  }

  consultarPorDocumento() {
    return of([usuario]);
  }
}
