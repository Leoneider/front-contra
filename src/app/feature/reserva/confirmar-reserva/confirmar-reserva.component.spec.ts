import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { NotifierModule } from 'angular-notifier';
// import { Usuario } from '../../usuario/shared/model/usuario';
import { UsuarioService } from '../../usuario/shared/service/usuario.service';
import { ReservaService } from '../shared/services/reserva.service';
import { ConfirmarReservaComponent } from './confirmar-reserva.component';

export class UsuarioMockService {
  guardar() {
    return {
      name: 'morpheus',
      job: 'leader',
      id: '808',
      createdAt: '2021-04-14T22:22:44.163Z',
    };
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

export class ReservaMockService {
  escenarioSeleccionado = 1;
  horaSelecionada = 20;
}

describe('ConfirmarReservaComponent', () => {
  let component: ConfirmarReservaComponent;
  let fixture: ComponentFixture<ConfirmarReservaComponent>;
  let reservaService: ReservaService;
  // let usuarioService: UsuarioService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmarReservaComponent],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        NotifierModule,
      ],
      providers: [
        { provide: ReservaService, useClass: ReservaMockService },
        { provide: UsuarioService, useClass: UsuarioMockService },
        NotificationService,
        HttpService,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarReservaComponent);
    reservaService = TestBed.inject(ReservaService);
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

  it('confirmar reserva', () => {
    const spy = spyOn(component, 'guardarReserva').and.callThrough();
    component.isUsuarioEncontrado = true;
    fixture.detectChanges();
    component.confirmar()
    expect(spy).toHaveBeenCalled();
  });

  it('confirmar reserva sin usuario registrado', () => {
    const spy = spyOn(component, 'guardarUsuario').and.callThrough();
    component.isUsuarioEncontrado = false;
    fixture.detectChanges();
    component.confirmar()
    expect(spy).toHaveBeenCalled();
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

  





});
