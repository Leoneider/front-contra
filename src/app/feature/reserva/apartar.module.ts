import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

import { ApartarRoutingModule } from './apartar-routing.module';
import { ApartarComponent } from './reservar-escenario/apartar.component';
import { SharedModule } from '@shared/shared.module';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';
import { UsuariosModule } from '../usuario/usuarios.module';
import { LottieModule } from 'ngx-lottie';

// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import('lottie-web');
}


@NgModule({
  declarations: [ApartarComponent, ConfirmarReservaComponent],
  imports: [CommonModule, ApartarRoutingModule, SharedModule, UsuariosModule, LottieModule.forRoot({ player: playerFactory })],
  providers: [CurrencyPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApartarModule {}
