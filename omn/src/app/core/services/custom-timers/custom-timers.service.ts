import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { filter, scan, takeWhile } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class CustomTimersService {
  public emailValidateTimer$ = new BehaviorSubject(0);
  constructor(private configS: ConfigService) {}

  buildTimer(seconds) {
    return timer(0, 1000).pipe(
      scan((acc) => --acc, seconds),
      takeWhile((x) => x >= 0)
    );
  }

  buildIndefiniteTimer(periodMiliseconds = 60000) {
    return timer(0, periodMiliseconds).pipe(filter((v) => v !== 0));
  }

  public startEmailValidateTimer() {
    const maxTimer = this.configS.activateDelay();
    this.buildTimer(maxTimer).subscribe((v) =>
      this.emailValidateTimer$.next(v)
    );
  }
}
