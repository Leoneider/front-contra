import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { NotifierModule } from 'angular-notifier';
import { UsuarioService } from '../../usuario/shared/service/usuario.service';
import { ReservaService } from '../shared/services/reserva.service';
import { ConfirmarReservaComponent } from './confirmar-reserva.component';
import * as Rx from 'rxjs';
import { PerfilComponent } from '../../usuario/components/perfil/perfil.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

export class UsuarioMockService {
  guardar() {
    return true;
  }
  consultarPorDocumento() {
    return {
      id: 1,
      documento: '1091661577',
      nombres: 'leoneider',
      apellidos: 'trigos guerrero',
      celular: '3174638521',
      email: 'leoneider@hotmail.es',
      fehca_nacimiento: '24-06-1989',
      contrasena: '123456',
    };
  }
}

describe('ConfirmarReservaComponent', () => {
  let component: ConfirmarReservaComponent;
  let fixture: ComponentFixture<ConfirmarReservaComponent>;
  let reservaService: ReservaService;
  let usuarioService: UsuarioService;
  let notificationService: NotificationService;
  let reservaMockService: Partial<ReservaService>;

  reservaMockService = {
    escenarioSeleccionado: {
      id: 1,
      valor: 70000,
      nombre: 'andres',
      direccion: '',
      imagen: '',
      horaInicial: 17,
      horaFinal:20
    },
    horaSelecionada: { horaInicial: 18, isDisponible: true },
    guardar: () => {
      return Rx.of(true);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarReservaComponent, PerfilComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule.withRoutes(
          [{path: 'usuario/perfil', component: PerfilComponent}]
        ),
        NotifierModule,
      ],
      providers: [
        { provide: ReservaService,HttpService, NotificationService, useValue: reservaMockService },
        { provide: UsuarioService, useClass: UsuarioMockService },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarReservaComponent);
    usuarioService = TestBed.inject(UsuarioService);
    reservaService = TestBed.inject(ReservaService);
    notificationService = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener hora y escenario seleccionado', () => {
    component.ngOnInit();
    expect(component.escenarioSeleccionado).toEqual(
      reservaService.escenarioSeleccionado
    );
    expect(component.horaSelecionada).toEqual(reservaService.horaSelecionada);
  });

  it('confirmar reserva', waitForAsync(() => {
    const spy = spyOn(component, 'guardarReserva').and.callThrough();
    const spyUserService = spyOn(usuarioService, 'guardar').and.returnValue(Rx.of(true));
    component.isUsuarioEncontrado = true;
    fixture.detectChanges();
    component.confirmar();
    expect(spy).toHaveBeenCalled();
    expect(spyUserService).toHaveBeenCalled();
  }));

  it('confirmar reserva sin usuario registrado', () => {
    const spy = spyOn(component, 'guardarUsuario').and.callThrough();
    const spyUserService = spyOn(usuarioService, 'guardar').and.returnValue(Rx.of(true));
    component.isUsuarioEncontrado = false;
    fixture.detectChanges();
    component.confirmar();
    expect(spy).toHaveBeenCalled();
    expect(spyUserService).toHaveBeenCalled();
  });

  it('El boton inicia deshabilitado', () => {
    const BOTON: HTMLButtonElement = document.querySelector('#btn_confirmar');
    expect(BOTON.disabled).toBeTrue;
  });

  it('Habilita el boton confirmar', () => {
    const BOTON: HTMLButtonElement = document.querySelector('#btn_confirmar');
    component.isUsuarioEncontrado = true;
    fixture.detectChanges();
    expect(BOTON.disabled).toBeFalse;
  });

  it('Se guarda la reserva correctamente', () => {
    const spy = spyOn(notificationService, 'showSucces').and.callThrough();
    const spyRouter = spyOn(component.router, 'navigateByUrl').and.callThrough();
    component.guardarReserva();
    expect(spy).toHaveBeenCalled;
    expect(spyRouter).toHaveBeenCalled;
  });

});
