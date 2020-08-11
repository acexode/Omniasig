import { TestBed } from '@angular/core/testing';

import { LocuinteService } from './locuinte.service';

describe('LocuinteService', () => {
  let service: LocuinteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocuinteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
