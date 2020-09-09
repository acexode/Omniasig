import { TestBed } from '@angular/core/testing';

import { PhonenumberService } from './phonenumber.service';

describe('PhonenumberService', () => {
  let service: PhonenumberService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PhonenumberService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
