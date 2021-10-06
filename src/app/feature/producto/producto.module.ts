import { NgModule } from '@angular/core';

import { ProductoRoutingModule } from './producto-routing.module';

import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';
import { SharedModule } from '@shared/shared.module';
import { ProductoService } from './shared/service/producto.service';


@NgModule({
  declarations: [
    CrearProductoComponent,
  ],
  imports: [
    ProductoRoutingModule,
    SharedModule
  ],
  providers: [ProductoService]
})
export class ProductoModule { }
