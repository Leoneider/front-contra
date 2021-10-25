import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from '@pages/home/home.component';
import { SecurityGuard } from './security.guard';

describe('AuthGuard', () => {
  let guard: SecurityGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [  RouterTestingModule.withRoutes([
        { path: 'home', component: HomeComponent },
      ])]
    });
    guard = TestBed.inject(SecurityGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('No permite el paso', () => {
    localStorage.clear();
    let res = guard.canActivate();
    expect(res).not.toBeTruthy();
  });

  it('Permite el paso', () => {
    localStorage.setItem('user', '{"id":1,"documento":"1091661577","nombres":"leoneider","apellidos":"trigos guerrero","celular":"3174638521","email":"leoneider@hotmail.es","fehca_nacimiento":"24-06-1989","contrasena":"1234567"}');
    let res = guard.canActivate();
    expect(res).toBeTruthy();
  });


});
