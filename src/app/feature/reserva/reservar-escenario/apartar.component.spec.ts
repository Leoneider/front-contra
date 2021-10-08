import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { NotifierModule } from 'angular-notifier';
import { ReservaService } from '../shared/services/reserva.service';
import * as Rx from 'rxjs';
import { ApartarComponent } from './apartar.component';

describe('ApartarComponent', () => {
  let component: ApartarComponent;
  let fixture: ComponentFixture<ApartarComponent>;
  let reservaMockService: Partial<ReservaService>;
  let reservaService: ReservaService;

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
    consultarPorFechaAndIdEscenario: () => {
      return Rx.of([]);
    },
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, NotifierModule, HttpClientTestingModule],
      declarations: [ ApartarComponent ],
      providers: [{ provide: ReservaService,HttpService, NotificationService, useValue: reservaMockService },]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartarComponent);
    reservaService = TestBed.inject(ReservaService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Calcular horario disponible', waitForAsync(() => {
    component.reservasDelEscenario = [];
    component.ngOnInit();
    fixture.detectChanges();
    component.calcularHorarioDisponible(13, 15);
    expect(component).toBeTruthy();
  }));


});
