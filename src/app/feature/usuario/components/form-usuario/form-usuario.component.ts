import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Usuario } from '../../shared/model/usuario';

@Component({
  selector: 'app-form-usuario',
  templateUrl: './form-usuario.component.html',
  styleUrls: ['./form-usuario.component.scss'],
})
export class FormUsuarioComponent implements OnInit {
  @Input() usuario: Usuario;
  @Output() usuarioFormEvent = new EventEmitter<FormGroup>(); 

  usuarioForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.buildFormUsusario();
    if (this.usuario) {
      this.usuarioForm.patchValue(this.usuario);
    }
    this.emitirFormUsuario();
  }

  buildFormUsusario() {
    this.usuarioForm = new FormGroup({
      id: new FormControl(''),
      documento: new FormControl(''),
      fehca_nacimiento: new FormControl(''),
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      celular: new FormControl('', [Validators.required]),
      email: new FormControl(''),
      contrasena: new FormControl('', [Validators.required]),
    });
  }

  getDataUsuarioForm() {
    return this.usuarioForm.value;
  }

  emitirFormUsuario(){
    this.usuarioForm.valueChanges.subscribe( () => {
      this.usuarioFormEvent.emit(this.usuarioForm)
    })
  }


}
