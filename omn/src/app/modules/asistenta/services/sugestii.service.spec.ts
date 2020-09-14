import { TestBed } from '@angular/core/testing';

import { SugestiiService } from './sugestii.service';

describe('SugestiiService', () => {
  let service: SugestiiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SugestiiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
