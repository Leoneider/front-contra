import { TestBed } from '@angular/core/testing';

import { EscenarioService } from './escenario.service';

describe('EscenarioService', () => {
  let service: EscenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EscenarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
