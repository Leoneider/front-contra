import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { NotifierModule } from 'angular-notifier';
import { ReservaService } from '../shared/services/reserva.service';
import * as Rx from 'rxjs';
import { ApartarComponent } from './apartar.component';
import { ConfirmarReservaComponent } from '../confirmar-reserva/confirmar-reserva.component';

describe('ApartarComponent', () => {
  let component: ApartarComponent;
  let fixture: ComponentFixture<ApartarComponent>;
  let reservaMockService: Partial<ReservaService>;
  let notificationService: NotificationService;

  reservaMockService = {
    escenarioSeleccionado: {
      id: 1,
      valor: 70000,
      nombre: 'andres',
      direccion: '',
      imagen: '',
      horaInicial: 17,
      horaFinal: 20,
    },
    horaSelecionada: { horaInicial: 18, isDisponible: true },
    consultarPorFechaAndIdEscenario: () => {
      return Rx.of([{
        id: 1,
        fecha: '10-04-2021',
        hora: 13,
        estado: 'RESERVADA',
        valor: 70000,
        escenario_id: 1,
      }]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([
          { path: 'reservar/confirmar', component: ConfirmarReservaComponent },
        ]),
        NotifierModule,
        HttpClientTestingModule,
      ],
      declarations: [ApartarComponent, ConfirmarReservaComponent],
      providers: [
        {
          provide: ReservaService,
          HttpService,
          NotificationService,
          useValue: reservaMockService,
        },
      ],
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
    'Calcular horario disponible',
    waitForAsync(() => {
      component.reservasDelEscenario = [];
      component.ngOnInit();
      fixture.detectChanges();
      component.calcularHorarioDisponible(13, 15);
      expect(component).toBeTruthy();
    })
  );

  fit(
    'Calcular horario disponible cuando escenario tiene reservas',
    waitForAsync(() => {
      component.ngOnInit();
      fixture.detectChanges();
      component.calcularHorarioDisponible(13, 15);
      expect(component).toBeTruthy();
    })
  );

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

  fit('Seleccionar hora no disponible', () => {
    component.seleccionarHora({ horaInicial: 20, isDisponible: true });
    component.confirmarHora();
    expect(component.horaSeleccionada).toBeUndefined;
  });
});
