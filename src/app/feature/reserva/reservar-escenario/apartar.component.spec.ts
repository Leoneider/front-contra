// import { HttpClientTestingModule } from '@angular/common/http/testing';
// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { RouterTestingModule } from '@angular/router/testing';
// import { HttpService } from '@core/services/http.service';
// import { NotificationService } from '@core/services/notification.service';
// import { NotifierModule } from 'angular-notifier';
// import { ReservaService } from '../shared/services/reserva.service';

// import { ApartarComponent } from './apartar.component';

// describe('ApartarComponent', () => {
//   let component: ApartarComponent;
//   let fixture: ComponentFixture<ApartarComponent>;

//   beforeEach(async () => {
//     await TestBed.configureTestingModule({
//       imports: [RouterTestingModule, NotifierModule, HttpClientTestingModule],
//       declarations: [ ApartarComponent ],
//       providers: [HttpService, NotificationService, ReservaService]
//     })
//     .compileComponents();
//   });

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ApartarComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });

//   it('Calcular horario disponible', () => {
//     component.reservasDelEscenario = [];
//     component.calcularHorarioDisponible(13, 15);
//     expect(component).toBeTruthy();
//   });


// });
