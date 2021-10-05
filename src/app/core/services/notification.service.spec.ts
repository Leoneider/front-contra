
import { TestBed } from '@angular/core/testing';
import { NotifierModule, NotifierService } from 'angular-notifier';


import { NotificationService } from './notification.service';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NotifierModule],
      providers: [ NotifierService ]
    });
    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
