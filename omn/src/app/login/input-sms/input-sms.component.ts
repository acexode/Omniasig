import { CustomTimersService } from './../../core/services/custom-timers/custom-timers.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInputConfig } from './../../shared/models/component/ion-input-config';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  Component,
  OnInit,
  AfterViewInit,
  ElementRef,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-input-sms',
  templateUrl: './input-sms.component.html',
  styleUrls: ['./input-sms.component.scss'],
})
export class InputSmsComponent implements OnInit, AfterViewInit, OnDestroy {
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
    this.startTimer();
  }

  verifyDigit() {
    this.router.navigate(['login/verify']);
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
