import { Injectable } from '@angular/core';
import { of, timer } from 'rxjs';
import { scan, takeWhile } from 'rxjs/operators';
import { ConfigService } from './config/config.service';

@Injectable({
  providedIn: 'root',
})
export class CustomTimersService {
  public emailValidateTimer$ = of(0);
  constructor(private configS: ConfigService) {}

  buildTimer(seconds) {
    return timer(0, 1000).pipe(
      scan((acc) => --acc, seconds),
      takeWhile((x) => x >= 0)
    );
  }

  public startEmailValidateTimer() {
    const maxTimer = this.configS.activateDelay();
    this.emailValidateTimer$ = this.buildTimer(maxTimer);
  }
}
