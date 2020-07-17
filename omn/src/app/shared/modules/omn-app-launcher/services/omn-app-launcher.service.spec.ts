import { TestBed } from '@angular/core/testing';

import { OmnAppLauncherService } from './omn-app-launcher.service';

describe('OmnAppLauncherService', () => {
  let service: OmnAppLauncherService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OmnAppLauncherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
