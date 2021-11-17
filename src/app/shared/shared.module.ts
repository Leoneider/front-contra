import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MensajeErrorCamposDirective } from './directivas/error-campos/directiva/mensaje-error-campos.directive';
import { MensajeErrorCamposSubmitDirective } from './directivas/error-campos/directiva/mensaje-error-campos-submit.directive';
import { MensajeErrorCamposContenedorDirective } from './directivas/error-campos/directiva/mensaje-error-campos-contenedor.directive';
import { ErrorCamposPlantillaComponent } from './directivas/error-campos/componente/error-campos-plantilla.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TrackByPipe } from './pipe/track-by.pipe';
import { NgMaterialModule } from './ng-material/ng-material.module';
import { TopbarComponent } from './components/topbar/topbar.component';
import { DoceHorasPipe } from './pipe/doce-horas.pipe';
import { CurrencyColPipe } from './pipe/currency-col.pipe';
import { FirstMayusPipe } from './pipe/first-mayus.pipe';

@NgModule({
  declarations: [
    ErrorCamposPlantillaComponent,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    TrackByPipe,
    TopbarComponent,
    DoceHorasPipe,
    CurrencyColPipe,
    FirstMayusPipe
  ],
  imports: [ReactiveFormsModule, FormsModule, NgMaterialModule],
  exports: [
    CommonModule,
    HttpClientModule,
    MensajeErrorCamposDirective,
    MensajeErrorCamposContenedorDirective,
    MensajeErrorCamposSubmitDirective,
    ReactiveFormsModule,
    FormsModule,
    TrackByPipe,
    NgMaterialModule,
    DoceHorasPipe,
    FirstMayusPipe,
    CurrencyColPipe
  ]
})
export class SharedModule { }
