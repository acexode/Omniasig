import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { RequestNewPhoneNumberChange } from '../models/RequestNewPhoneNumberChange.interface';
import { PhonenumberService } from '../services/phonenumber.service';

@Component({
  selector: 'app-change-phone-number',
  templateUrl: './change-phone-number.component.html',
  styleUrls: ['./change-phone-number.component.scss'],
})
export class ChangePhoneNumberComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Schimbare număr  telefon');
  label: IonTextItem = {
    text: 'Introdu noul număr de telefon',
    classes: 'w-100 pb-8',
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
    maxLength: 11,
  };
  teleForm: FormGroup;

  sub: Subscription;
  error = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private phS: PhonenumberService,
    private authS: AuthService
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

    this.sub = this.teleForm.valueChanges.subscribe((value) => {
      this.onUserInput(value.phoneNumber);
    });
  }

  onUserInput(phoneNumber: number) {
    if (phoneNumber) {
      if (phoneNumber.toString().length > 0) {
        this.error = false;
      } else {
        this.error = true;
      }
    }
  }

  proceed() {
    const newPhoneNumber = this.teleForm.controls.phoneNumber.value;

    this.authS.getAuthState().subscribe((authData) => {
      const { userId } = authData.account;
      const requestNewPhoneDetails: RequestNewPhoneNumberChange = {
        userNameOrId: userId,
        newPhoneNumber,
      };
      this.phS.updatePhoneNumber(requestNewPhoneDetails).subscribe(
        (response) => {
          this.router.navigate(['phone-number/confirm-number', newPhoneNumber]);
        },
        (err) => {
          this.isError();
        }
      );
    });
  }

  isError() {
    this.teleForm.reset();
    this.error = true;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
