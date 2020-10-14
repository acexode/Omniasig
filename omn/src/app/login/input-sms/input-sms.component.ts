import { unsubscriberHelper } from './../../core/helpers/unsubscriber.helper';
import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomTimersService } from './../../core/services/custom-timers/custom-timers.service';
import { IonInputConfig } from './../../shared/models/component/ion-input-config';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-input-sms',
  templateUrl: './input-sms.component.html',
  styleUrls: ['./input-sms.component.scss'],
})
export class InputSmsComponent implements OnInit, AfterViewInit, OnDestroy {
  min = '00';
  sec: any = 59;
  digitsLength = 0;
  sub: Subscription;
  phoneNumber = null;
  errorLogin: string = null;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  busy = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timers: CustomTimersService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
  ) { }

  ngOnInit() {
    this.getPhoneNumber();
  }

  getPhoneNumber() {
    this.sub = this.route.params.pipe(take(1)).subscribe((params) => {
      if (params.number) {
        this.phoneNumber = params.number;
      } else {
        this.router.navigate(['/login']);
      }
    });
  }

  ngAfterViewInit() {
    this.startTimer();
  }

  startTimer() {
    this.timers.buildTimer(59).subscribe((time: number) => {
      this.sec = time;
    });
  }

  resendSMS() {
    this.auth.sendPhoneNumberSms(this.phoneNumber).subscribe(
      (data) => {
        this.startTimer();
      },
      (err) => { }
    );
  }

  verifyDigit(passForm: FormGroup) {
    this.busy = true;
    const code = passForm.get('passcode').value;
    this.auth.confirmPhoneNumberSms(this.phoneNumber, code).subscribe(
      (data) => {
        this.busy = false;
        this.router.navigate(['login/verify', this.phoneNumber]);
      },
      (err) => {
        this.confirmationError(err, passForm);
      }
    );
  }

  clearErr(e) {
    this.errorLogin = null;
  }

  confirmationError(err, passForm) {
    passForm.reset();
    this.digitsLength = 0;
    this.errorLogin = 'Cod Invalid!';
    this.busy = false;
  }

  ngOnDestroy() {
    unsubscriberHelper(this.sub);
  }

  doLogout() {
    this.auth.doLogout();
  }
}
