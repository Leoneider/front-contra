
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

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [CommonModule, RouterTestingModule, SharedModule, NotifierModule, EscenarioModule, HttpClientTestingModule],
      declarations: [ HomeComponent ],
      providers:[HttpService, EscenarioService, NotificationService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
