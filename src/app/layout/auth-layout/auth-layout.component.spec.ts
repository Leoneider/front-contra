import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpService } from '@core/services/http.service';
import { NotificationService } from '@core/services/notification.service';
import { HomeComponent } from '@pages/home/home.component';
import { NotifierModule } from 'angular-notifier';
import { EscenarioService } from 'src/app/feature/escenario/shared/service/escenario.service';

import { AuthLayoutComponent } from './auth-layout.component';

describe('AuthLayoutComponent', () => {
  let component: AuthLayoutComponent;
  let fixture: ComponentFixture<AuthLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[RouterTestingModule.withRoutes([
        { path: 'home', component: HomeComponent },
      ]),
    HttpClientTestingModule,
    NotifierModule],
      providers: [HttpService, EscenarioService, NotificationService],
      declarations: [ AuthLayoutComponent ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('logout', waitForAsync(() => {
    localStorage.setItem('user', '{"id":1,"documento":"1091661577","nombres":"leoneider","apellidos":"trigos guerrero","celular":"3174638521","email":"leoneider@hotmail.es","fehca_nacimiento":"24-06-1989","contrasena":"1234567"}');
    component.logout();
    expect(localStorage.getItem('user')).toBeUndefined;
  }));

});
