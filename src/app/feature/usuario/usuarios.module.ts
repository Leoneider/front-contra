import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormUsuarioComponent } from './components/form-usuario/form-usuario.component';
import { SharedModule } from '@shared/shared.module';
import { PerfilComponent } from './components/perfil/perfil.component';


@NgModule({
  declarations: [
    UsuariosComponent,
    FormUsuarioComponent,
    PerfilComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ],
  exports: [
    FormUsuarioComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class UsuariosModule { }
