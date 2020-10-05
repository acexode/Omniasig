import { TestBed } from '@angular/core/testing';

import { LocuinteRouteResolverService } from './locuinte-view-route-resolver.service';

describe('LocuinteRouteResolverService', () => {
  let service: LocuinteRouteResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocuinteRouteResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
