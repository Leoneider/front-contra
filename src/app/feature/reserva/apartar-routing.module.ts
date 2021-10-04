import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartarComponent } from './reservar-escenario/apartar.component';

const routes: Routes = [{ path: '', component: ApartarComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApartarRoutingModule { }
