import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs/operators';
import { Escenario } from '../../shared/model/escenario';

import { EscenarioComponent } from './escenario.component';

describe('EscenarioComponent', () => {
  let component: EscenarioComponent;
  let fixture: ComponentFixture<EscenarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EscenarioComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EscenarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('seleccionar escenario', () => {
    let espectedSelectedEscenario: Escenario = {
      id: 0,
      nombre: '',
      direccion: '',
      valor: 0,
      horaInicial: 0,
      horaFinal: 0,
      imagen: '',
    };
    let selectedEscenario: Escenario | undefined;
    component.selectEscenario.pipe(first()).subscribe((escenario: Escenario) => selectedEscenario = escenario);
  
    component.seleccionar(espectedSelectedEscenario);
    expect(selectedEscenario).toBe(espectedSelectedEscenario);
  });
});
