import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUsuarioComponent } from './form-usuario.component';

describe('FormUsuarioComponent', () => {
  let component: FormUsuarioComponent;
  let fixture: ComponentFixture<FormUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormUsuarioComponent],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('se contruye formulario en el ngOnInit', () => {
    const spy = spyOn(component, 'buildFormUsusario').and.callThrough();
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled;
  });

  it('se contruye formulario en el ngOnInit con usuario', () => {
    const spy = spyOn(component, 'buildFormUsusario').and.callThrough();
    component.usuario = {
      id: 1,
      documento: '1091661577',
      nombres: 'leoneider',
      apellidos: 'trigos',
      celular: '3174638521',
      email: 'leoneider@hotmail.com',
      fehca_nacimiento: '24-16-1989',
      contrasena: '123456',
    };
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalled;
    expect(component.usuarioForm.get('documento').value).toEqual('1091661577');
  });

  it('El formulario es valido', () => {
    const form = component.usuarioForm;
    form.get('nombres').setValue('leoneider');
    form.get('apellidos').setValue('trigos');
    form.get('celular').setValue('3174638521');
    form.get('contrasena').setValue('123456');
    fixture.detectChanges();
    expect(form.valid).toBeTruthy();
  });

  it('El formulario es invalido', () => {
    const form = component.usuarioForm;
    form.get('contrasena').setValue('123456');
    fixture.detectChanges();
    expect(form.invalid).toBeTruthy();
  });

  it('Retorna el valor del formulario', () => {
    const form = component.usuarioForm;
    form.get('nombres').setValue('leoneider');
    form.get('apellidos').setValue('trigos');
    form.get('celular').setValue('3174638521');
    form.get('contrasena').setValue('123456');
    fixture.detectChanges();
    let userData = component.getDataUsuarioForm();
    expect(userData.nombres).toEqual('leoneider');
  });
});
