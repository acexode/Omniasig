import { AuthService } from './../../core/services/auth/auth.service';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { RegistrationService } from './../../core/services/auth/registration.service';

@Component({
  selector: 'app-reg-input-sms',
  templateUrl: './reg-input-sms.component.html',
  styleUrls: ['./reg-input-sms.component.scss'],
})
export class RegInputSmsComponent implements OnInit, AfterViewInit {
  @HostBinding('class') color = 'ion-color-white-page';
  min = '00';
  sec: any = 59;
  phoneNumber = null;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  InvalidCode: string = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timers: CustomTimersService,
    private auth: AuthService,
    private regService: RegistrationService
  ) {
    this.checkUserObj();
  }

  ngOnInit() {
    this.phoneNumber = this.regService.getuserObj.phoneNumber;
  }

  checkUserObj() {
    if (
      !this.regService.getuserObj?.phoneNumber ||
      !this.regService.getuserObj?.userName
    ) {
      this.router.navigate(['/registration']);
    }
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
    this.regService
      .RegisterPhoneNumber(this.regService.getuserObj.phoneNumber)
      .subscribe(
        (data) => {
          this.startTimer();
        },
        (err) => err
      );
  }

  verifyDigit(passForm: FormGroup) {
    this.regService
      .ConfirmPhoneNumber(passForm.get('passcode').value)
      .subscribe(
        (data) => {
          this.router.navigate(['registration/notice']);
        },
        (err) => {
          passForm.reset();
          this.InvalidCode = err.error;
        }
      );
  }

  clearErr(_) {
    this.InvalidCode = null;
  }

  doLogout() {
    this.auth.doLogout();
  }
}
