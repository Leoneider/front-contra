import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SecurityGuard } from '@core/guard/security.guard';
import { NotFoundComponent } from './feature/pages/not-found/not-found.component';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';

export const routes: Routes = [
  { path: '', redirectTo: '/pages/home', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      {
        path: 'pages',
        loadChildren: () =>
          import('./feature/pages/page.module').then((mod) => mod.PageModule),
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
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'usuario',
        canActivate: [SecurityGuard],
        loadChildren: () =>
          import('./feature/usuario/usuarios.module').then(
            (m) => m.UsuariosModule
          ),
      },
    ],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
