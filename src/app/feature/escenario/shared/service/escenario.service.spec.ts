import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';

import { EscenarioService } from './escenario.service';

describe('EscenarioService', () => {
  let service: EscenarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService]
    });
    service = TestBed.inject(EscenarioService);
  });

  it('should be created', () => {
    service = TestBed.inject(EscenarioService);
    expect(service).toBeTruthy();
  });
});
