import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearProductoComponent } from './components/crear-producto/crear-producto.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'crear',
        component: CrearProductoComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
