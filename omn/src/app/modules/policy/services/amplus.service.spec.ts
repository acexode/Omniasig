import { TestBed } from '@angular/core/testing';

import { AmplusService } from './amplus.service';

describe('AmplusService', () => {
  let service: AmplusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmplusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
