import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { NotifierModule } from 'angular-notifier';

import { ReservaService } from './reserva.service';

describe('ReservaService', () => {
  let service: ReservaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, NotifierModule],
      providers: [HttpService]
    });
    service = TestBed.inject(ReservaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
