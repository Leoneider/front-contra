import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EscenarioComponent } from './components/escenario/escenario.component';

const routes: Routes = [{ path: '', component: EscenarioComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EscenarioRoutingModule { }
