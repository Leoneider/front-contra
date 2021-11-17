import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { NotifierModule } from 'angular-notifier';
import { ReservaService } from '../shared/services/reserva.service';
import { ApartarComponent } from './apartar.component';
import { ConfirmarReservaComponent } from '../confirmar-reserva/confirmar-reserva.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { DoceHorasPipe } from '@shared/pipe/doce-horas.pipe';
import { DatePipe } from '@angular/common';
import { ReservaServiceStub } from 'test/reserva-service-stub';
import { escenario } from 'test/mocks/escenario';

describe('ApartarComponent', () => {
  let component: ApartarComponent;
  let fixture: ComponentFixture<ApartarComponent>;
  let notificationService: NotificationService;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'reservar/confirmar', component: ConfirmarReservaComponent },
        ]),
        NotifierModule,
        HttpClientTestingModule,
      ],
      declarations: [ApartarComponent, ConfirmarReservaComponent, DoceHorasPipe],
      providers: [
        DatePipe,
        HttpService,
        NotificationService,
        {
          provide: ReservaService,
          useClass: ReservaServiceStub,
        },
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartarComponent);
    notificationService = TestBed.inject(NotificationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(
    'Calcular horario disponible cuando escenario tiene reservas',
    waitForAsync(() => {

      component.escenario = escenario;
      fixture.detectChanges();
      component.calcularHorarioDisponible(13, 15);
      expect(component).toBeTruthy();
    })
  );

  it('Ng on init sin seleccionar escenario', () => {
    component.reservaService.escenarioSeleccionado = null;
    component.ngOnInit();
    expect(component.escenario).toBeUndefined;
  });

  it('Confirmar hora seleccionada', () => {
    const spy = spyOn(component, 'redirectConfirm').and.callThrough();
    component.horaSeleccionada = { horaInicial: 20, isDisponible: true };
    fixture.detectChanges();
    component.confirmarHora();
    expect(spy).toHaveBeenCalled;
  });

  it('Confirmar hora seleccionada', () => {
    const spy = spyOn(notificationService, 'showError').and.callThrough();
    component.horaSeleccionada = { horaInicial: 0, isDisponible: true };
    fixture.detectChanges();
    component.confirmarHora();
    expect(spy).toHaveBeenCalled;
  });

  it('Seleccionar hora', () => {
    component.seleccionarHora({ horaInicial: 20, isDisponible: true });
    component.confirmarHora();
    expect(component.horaSeleccionada).toEqual({
      horaInicial: 20,
      isDisponible: true,
    });
  });

  it('Seleccionar hora no disponible', () => {
    component.seleccionarHora({ horaInicial: 20, isDisponible: false });
    component.confirmarHora();
    expect(component.horaSeleccionada).toBeUndefined;
  });
});
