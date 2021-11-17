import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { ReservaService } from 'src/app/feature/reserva/shared/services/reserva.service';

import { PerfilComponent } from './perfil.component';

describe('PerfilComponent', () => {
  let component: PerfilComponent;
  let fixture: ComponentFixture<PerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ PerfilComponent ],
      providers: [HttpService, ReservaService]

    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    localStorage.setItem('user', '{"id":1,"documento":"1091661577","nombres":"leoneider","apellidos":"trigos guerrero","celular":"3174638521","email":"leoneider@hotmail.es","fehca_nacimiento":"24-06-1989","contrasena":"1234567"}');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
