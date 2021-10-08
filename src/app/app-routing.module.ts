import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('@home/home.module').then((mod) => mod.HomeModule),
      },
      {
        path: 'escenario',
        loadChildren: () =>
          import('./feature/escenario/escenario.module').then(
            (m) => m.EscenarioModule
          ),
      },
      {
        path: 'reservar',
        loadChildren: () =>
          import('./feature/reserva/apartar.module').then(
            (m) => m.ApartarModule
          ),
      },
      {
        path: 'usuario',
        loadChildren: () =>
          import('./feature/usuario/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
