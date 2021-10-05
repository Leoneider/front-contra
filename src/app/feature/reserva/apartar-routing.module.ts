import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmarReservaComponent } from './confirmar-reserva/confirmar-reserva.component';
import { ApartarComponent } from './reservar-escenario/apartar.component';

const routes: Routes = [{ path: '', component: ApartarComponent },
{ path: 'confirmar', component: ConfirmarReservaComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartarRoutingModule { }
