import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarReservaComponent } from './confirmar-reserva.component';

describe('ConfirmarReservaComponent', () => {
  let component: ConfirmarReservaComponent;
  let fixture: ComponentFixture<ConfirmarReservaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarReservaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
