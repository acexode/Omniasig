import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  OnDestroy,
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
export class RegInputSmsComponent implements OnInit, AfterViewInit, OnDestroy {
  min: string = '00';
  sec: any = 59;
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription;
  phoneNumber = null;

  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  passForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timers: CustomTimersService,
    private formBuilder: FormBuilder
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
  }

  getPhoneNumber() {
    this.sub = this.route.params.subscribe((params) => {
      if (params.number) {
        this.phoneNumber = params.number;
      } else {
        this.router.navigate(['/registration']);
      }
    });
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
    this.startTimer();
  }

  verifyDigit() {
    this.router.navigate(['registration/notice']);
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.click();
      input.focus();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
