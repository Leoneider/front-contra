import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { SecurityGuard } from '@core/guard/security.guard';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'home', loadChildren: () => import('@home/home.module').then(mod => mod.HomeModule) },
      { path: 'escenario', loadChildren: () => import('./feature/escenario/escenario.module').then(m => m.EscenarioModule) },
      { path: 'reservar', loadChildren: () => import('./feature/apartar/apartar.module').then(m => m.ApartarModule) },
      { path: 'usuarios', loadChildren: () => import('./feature/usuarios/usuarios.module').then(m => m.UsuariosModule) }
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      { path: 'producto', loadChildren: () => import('@producto/producto.module').then(mod => mod.ProductoModule) },
    ],
  },
  
  
 
  // {path: '404', component:},
  // { path: '**', redirectTo: '/404'}
  
  // { path: 'home', component: HomeComponent, canActivate: [SecurityGuard]  },
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }