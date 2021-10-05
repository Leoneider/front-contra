import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { SharedModule } from '@shared/shared.module';


@NgModule({
  declarations: [
    UsuariosComponent,
    FormUsuarioComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  exports: [
    FormUsuarioComponent
  ]
})
export class UsuariosModule { }
