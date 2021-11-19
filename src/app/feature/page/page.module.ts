import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PageRoutingModule } from './page-routing.module';
import { SharedModule } from '@shared/shared.module';
import { EscenarioModule } from '../escenario/escenario.module';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';


@NgModule({
  declarations: [HomeComponent, NotFoundComponent],
  imports: [CommonModule, PageRoutingModule, SharedModule, EscenarioModule],
  exports: [HomeComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PageModule {}
