import { TestBed } from '@angular/core/testing';

import { LocuinteFormService } from './locuinte-form.service';

describe('LocuinteFormService', () => {
  let service: LocuinteFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocuinteFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
