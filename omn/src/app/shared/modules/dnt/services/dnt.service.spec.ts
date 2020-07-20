import { TestBed } from '@angular/core/testing';

import { DntService } from './dnt.service';

describe('DntService', () => {
  let service: DntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
