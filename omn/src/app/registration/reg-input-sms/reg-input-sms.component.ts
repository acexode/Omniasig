import { RegistrationService } from './../../core/services/auth/registration.service';
import {
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';

@Component({
  selector: 'app-reg-input-sms',
  templateUrl: './reg-input-sms.component.html',
  styleUrls: ['./reg-input-sms.component.scss'],
})
export class RegInputSmsComponent implements OnInit, AfterViewInit {
  @HostBinding('class') color = 'ion-color-white-page';
  min = '00';
  sec: any = 59;
  digitsLength = 0;
  @ViewChild('inputField') inputField: IonInput;
  phoneNumber = null;

  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  passForm: FormGroup;
  InvalidCode:string = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timers: CustomTimersService,
    private formBuilder: FormBuilder,
    private regService: RegistrationService
  ) {
    this.checkUserObj()
  }

  ngOnInit() {
    this.initForm();
    this.phoneNumber = this.regService.getuserObj.phoneNumber
  }

  checkUserObj() {
    if (!this.regService.getuserObj?.phoneNumber || !this.regService.getuserObj?.userName) {
      this.router.navigate(["/registration"])
    }
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
    } else {
      this.digitsLength = 0;
    }
    if (this.digitsLength > 5) {
      this.verifyDigit();
    }
  }

  ngAfterViewInit() {
    this.spawnInput();
    this.startTimer();
  }

  startTimer() {
    this.timers.buildTimer(59).subscribe((time: number) => {
      this.sec = time;
    });
  }

  resendSMS() {
    this.regService.RegisterPhoneNumber(this.regService.getuserObj.phoneNumber).subscribe(
      data => {
        this.startTimer()
      },
      err =>err
    )
  }

  verifyDigit() {
    this.regService.ConfirmPhoneNumber(this.passForm.controls["digit"].value).subscribe(
      data => {
        this.router.navigate(['registration/notice']);
      },
      err => {
        this.InvalidCode = err.error;
        setTimeout(() => {
          this.passForm.reset();
          this.InvalidCode = null;
        }, 2000);
      }
    )
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.click();
      input.focus();
    });
  }

}
