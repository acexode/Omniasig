import { TestBed } from '@angular/core/testing';

import { DocumenteService } from './documente.service';

describe('DocumenteService', () => {
  let service: DocumenteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DocumenteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
