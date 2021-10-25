import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { SharedModule } from '@shared/shared.module';
import { NotifierModule } from 'angular-notifier';

import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { ApartarComponent } from '../../reserva/reservar-escenario/apartar.component';
import { EscenarioService } from '../../escenario/shared/service/escenario.service';
import { EscenarioModule } from '../../escenario/escenario.module';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let notificationService: NotificationService;
  let escenarioService: EscenarioService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule.withRoutes([
          { path: 'reservar', component: ApartarComponent },
        ]),
        SharedModule,
        NotifierModule,
        EscenarioModule,
        HttpClientTestingModule,
      ],
      declarations: [HomeComponent, ApartarComponent],
      providers: [HttpService, EscenarioService, NotificationService],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(async () => {
    fixture = TestBed.createComponent(HomeComponent);
    notificationService = TestBed.inject(NotificationService);
    escenarioService = TestBed.inject(EscenarioService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('Obtener escenarios', () => {
    const spy = spyOn(component, 'obtenerEscenarios').and.callThrough();
    const spySer = spyOn(escenarioService, 'consultar').and.returnValue(
      of([
        {
          id: 1,
          nombre: 'leoneider',
          direccion: 'milanes',
          valor: 70000,
          imagen: 'string',
          horaInicial: 18,
          horaFinal: 20,
        },
      ])
    );
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
    expect(spySer).toHaveBeenCalled();
  });

  it(
    'El boton inicia deshabilitado',
    waitForAsync(() => {
      const BOTON: HTMLButtonElement = document.querySelector('#btn_select');
      expect(BOTON.disabled).toBeTrue;
    })
  );

  it(
    'Apartar escenario seleccionando escenario',
    waitForAsync(() => {
      const spy = spyOn(component, 'redirectReserva').and.callThrough();
      const BOTON: HTMLButtonElement = document.querySelector('#btn_select');
      component.escenarioSeleccionado = {
        id: 1,
        nombre: '',
        direccion: '',
        valor: 0,
        imagen: '',
        horaInicial: 17,
        horaFinal: 20,
      };
      fixture.detectChanges();
      BOTON.click();
      expect(spy).toHaveBeenCalled();
    })
  );

  it('Apartar escenario sin seleccionar escenario', () => {
    const spyNotification = spyOn(
      notificationService,
      'showError'
    ).and.callThrough();
    component.escenarioSeleccionado = null;
    fixture.detectChanges();
    component.apartarEscenario();
    expect(spyNotification.calls.any()).toBeTrue();
  });

  it('Seleccionar escenario', () => {
    component.sellecionarEscenario({
      id: 1,
      nombre: '',
      direccion: '',
      valor: 0,
      imagen: '',
      horaInicial: 17,
      horaFinal: 20,
    });
    expect(component.escenarioSeleccionado.id).toEqual(1);
  });
});
