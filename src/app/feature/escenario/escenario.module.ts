import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EscenarioRoutingModule } from './escenario-routing.module';
import { EscenarioComponent } from './components/escenario/escenario.component';
import { SharedModule } from '@shared/shared.module';

import { LottieModule } from 'ngx-lottie';


// Note we need a separate function as it's required
// by the AOT compiler.
export function playerFactory() {
  return import('lottie-web');
}

@NgModule({
  declarations: [EscenarioComponent],
  imports: [CommonModule, EscenarioRoutingModule, SharedModule, LottieModule.forRoot({ player: playerFactory })],
  exports: [EscenarioComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class EscenarioModule {}
