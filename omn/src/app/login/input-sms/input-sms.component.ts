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

@Component({
  selector: 'app-input-sms',
  templateUrl: './input-sms.component.html',
  styleUrls: ['./input-sms.component.scss'],
})
export class InputSmsComponent implements OnInit, AfterViewInit, OnDestroy {
  min = '00';
  sec: any = 59;
  digitsLength = 0;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription;
  phoneNumber = null;
  errorLogin: string = null;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  passForm: FormGroup;
  busy = false;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timers: CustomTimersService,
    private formBuilder: FormBuilder,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.initForm();
    this.getPhoneNumber();
  }
  initForm() {
    this.passForm = this.formBuilder.group({
      digit: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.passForm.valueChanges.subscribe((value) => {
      this.changeInput(value.digit);
    });
  }

  changeInput(digit: number) {
    if (digit) {
      this.digitsLength = digit.toString().length;
    }
    if (this.digitsLength > 5) {
      this.verifyDigit();
    }

    this.errorLogin = null;
    this.busy = false;
  }

  getPhoneNumber() {
    this.sub = this.route.params.subscribe((params) => {
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
      (err) => console.log(err)
    );
  }

  verifyDigit() {
    this.busy = true;
    const code = this.passForm.get('digit').value;
    this.auth.confirmPhoneNumberSms(this.phoneNumber, code).subscribe(
      (data) => {
        this.busy = false;
        this.router.navigate(['login/verify', this.phoneNumber]);
      },
      (err) => {
        this.confirmationError(err);
      }
    );
  }

  confirmationError(err) {
    this.passForm.reset();
    this.errorLogin = 'Cod Invalid!';
    this.busy = true;
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
      input.click();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
