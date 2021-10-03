import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApartarRoutingModule } from './apartar-routing.module';
import { ApartarComponent } from './apartar/apartar.component';
import { SharedModule } from '@shared/shared.module';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';


@NgModule({
  declarations: [
    ApartarComponent,
    ConfirmarReservaComponent
  ],
  imports: [
    CommonModule,
    ApartarRoutingModule,
    SharedModule
  ]
})
export class ApartarModule { }
