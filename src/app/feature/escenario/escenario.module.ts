import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscenarioRoutingModule } from './escenario-routing.module';
import { EscenarioComponent } from './components/escenario/escenario.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    EscenarioComponent
  ],
  imports: [
    CommonModule,
    EscenarioRoutingModule,
    SharedModule
  ],
  exports:[EscenarioComponent]
})
export class EscenarioModule { }
