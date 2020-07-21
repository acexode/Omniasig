import { TestBed } from '@angular/core/testing';

import { CustomTimersService } from './custom-timers.service';

describe('CustomTimersService', () => {
  let service: CustomTimersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomTimersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
