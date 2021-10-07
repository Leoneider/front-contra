import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { SharedModule } from '@shared/shared.module';
import { NotifierModule } from 'angular-notifier';
import { EscenarioModule } from '../escenario/escenario.module';
import { EscenarioService } from '../escenario/shared/service/escenario.service';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  // let notificationService: NotificationService
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        RouterTestingModule,
        SharedModule,
        NotifierModule,
        EscenarioModule,
        HttpClientTestingModule,
      ],
      declarations: [HomeComponent],
      providers: [HttpService, EscenarioService, NotificationService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Obtener escenarios', () => {
    const spy = spyOn(component, 'obtenerEscenarios').and.callThrough();
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  
  });

  it('El boton inicia deshabilitado', () => {
    const BOTON: HTMLButtonElement = document.querySelector('#btn_select');
    expect(BOTON.disabled).toBeTrue;
  });

  it('Apartar escenario seleccionando escenario', () => {
    const spy = spyOn(component, 'redirectReserva').and.callThrough();
    const BOTON: HTMLButtonElement = document.querySelector('#btn_select');
    component.escenarioSeleccionado = {id: 1, nombre: "", direccion: "", valor:0, imagen: "", horaInicial:17, horaFinal:20};
    fixture.detectChanges();
    BOTON.click();
    expect(spy).toHaveBeenCalled();
  });

  it('Apartar escenario sin seleccionar escenario', () => {
    const notificationService = jasmine.createSpyObj('NotificationService', ['showError']);
    const BOTON: HTMLButtonElement = document.querySelector('#btn_select');
    fixture.detectChanges();
    BOTON.click();
    expect(notificationService).toHaveBeenCalled;
  });


});
