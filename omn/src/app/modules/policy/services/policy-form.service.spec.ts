import { TestBed } from '@angular/core/testing';

import { PolicyFormService } from './policy-form.service';

describe('PolicyFormService', () => {
  let service: PolicyFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
