import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartarRoutingModule } from './apartar-routing.module';
import { ApartarComponent } from './reservar-escenario/apartar.component';
import { SharedModule } from '@shared/shared.module';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';
import { UsuariosModule } from '../usuario/usuarios.module';

@NgModule({
  declarations: [ApartarComponent, ConfirmarReservaComponent],
  imports: [CommonModule, ApartarRoutingModule, SharedModule, UsuariosModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ApartarModule {}
