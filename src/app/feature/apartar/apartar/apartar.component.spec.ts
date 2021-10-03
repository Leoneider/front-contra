import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApartarComponent } from './apartar.component';

describe('ApartarComponent', () => {
  let component: ApartarComponent;
  let fixture: ComponentFixture<ApartarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApartarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApartarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
