import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { RegistrationService } from './../../core/services/auth/registration.service';

@Component({
  selector: 'app-reg-numar-telefon',
  templateUrl: './reg-numar-telefon.component.html',
  styleUrls: ['./reg-numar-telefon.component.scss'],
})
export class RegNumarTelefonComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  label: IonTextItem = {
    text: 'Numărul tău de telefon',
    classes: 'link-small color-tertiary-grey w-100 bg-white pb-8',
    slot: 'end',
  };
  config: IonInputConfig = {
    placeholder: '07XX XXX XXX',
    type: 'tel',
    inputMode: 'tel',
    size: 100,
    inputLabel: this.label,
    clearable: true,
    minLength: 10,
    inputClasses: 'ion-item-right',
  };
  teleForm: FormGroup;
  busy = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private regSerivce: RegistrationService
  ) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.teleForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^07[0-9].*$/),
          Validators.minLength(9),
        ],
      ],
    });
  }
  get phoneNumber() {
    return this.teleForm.get('phoneNumber');
  }
  reg() {
    this.busy = true;
    this.regSerivce.GetUserNameByPhoneNumber(this.phoneNumber.value).subscribe(
      (data) => {
        if (data) {
          this.router.navigate(['login/authenticate', this.phoneNumber.value]);
          this.busy = false;
        } else {
          this.proceed();
        }
      },
      (err) => {
        this.proceed();
      }
    );
  }

  proceed() {
    this.regSerivce.setUserObj({
      phoneNumber: this.phoneNumber.value,
      userName: this.phoneNumber.value,
    });
    this.regSerivce.RegisterPhoneNumber(this.phoneNumber.value).subscribe(
      (data) => {
        this.busy = false;
        this.router.navigate(['registration/confirm-number']);
      },
      (err) => {
        this.busy = false;
      }
    );
  }
}
