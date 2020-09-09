import { TestBed } from '@angular/core/testing';

import { ChangeCodeService } from './change-code.service';

describe('ChangeCodeService', () => {
  let service: ChangeCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
