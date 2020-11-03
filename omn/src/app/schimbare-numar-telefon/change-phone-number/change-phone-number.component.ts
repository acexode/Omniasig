import { take } from 'rxjs/operators';
import { genericErrorTexts } from './../../shared/data/generic-error-helper';
import { get } from 'lodash';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of, Subscription, combineLatest } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { schimbareNumarSubpageHeader } from 'src/app/schimbare-numar-telefon/data/schimbare-numar-subpage-header';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { RequestNewPhoneNumberChange } from '../models/RequestNewPhoneNumberChange.interface';
import { PhonenumberService } from '../services/phonenumber.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-phone-number',
  templateUrl: './change-phone-number.component.html',
  styleUrls: ['./change-phone-number.component.scss'],
})
export class ChangePhoneNumberComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  pText = 'Introdu noul număr de telefon';
  fText = 'Numărul tău de telefon';
  teleForm: FormGroup;
  sub: Subscription;
  formSubmitting = false;
  error = false;
  label: IonTextItem = {
    text: this.pText,
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
    maxLength: 10,
  };
  headerConfig;
  errorMsgs = [];

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private phS: PhonenumberService,
    private authS: AuthService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.headerConfig = schimbareNumarSubpageHeader({
      title: 'Schimbare număr telefon',
      hasTrailingIcon: true,
      hasLeadingIcon: true,
      backLink: false,
    });
    this.initForm();
  }

  initForm() {
    this.teleForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^07[0-9].*$/),
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  get phoneNumber() {
    return this.teleForm.get('phoneNumber');
  }

  proceed() {
    const newPhoneNumber = this.phoneNumber.value;
    this.formSubmitting = true;
    combineLatest([this.authS.getAuthState(), this.authS.getPhoneNumber()])
      .pipe(take(1))
      .subscribe((data) => {
        const authData = data[0];
        const authNum = data[1];
        const { userId } = authData.account;
        let obsv = of(true);
        try {
          if (authNum !== newPhoneNumber) {
            obsv = this.phS.checkPhoneNumber(newPhoneNumber);
          }
        } catch {}
        obsv.subscribe(
          (checkResponse) => {
            const requestNewPhoneDetails: RequestNewPhoneNumberChange = {
              userNameOrId: userId,
              newPhoneNumber,
            };
            this.phS.updatePhoneNumber(requestNewPhoneDetails).subscribe(
              (response) => {
                this.formSubmitting = false;
                this.router.navigate([
                  'phone-number/confirm-number',
                  newPhoneNumber,
                ]);
              },
              (err) => this.isError(err)
            );
          },
          (err) => this.isError(err)
        );
      });
  }

  isError(err) {
    this.teleForm.reset();
    this.errorMsgs = genericErrorTexts(
      err
        ? get(err, 'error', 'A fost identificată o problemă...')
        : 'A fost identificată o problemă...',
      ''
    );
    this.formSubmitting = false;
    this.error = true;
  }

  exitFlow() {
    this.navCtrl.navigateBack(['/home']);
  }

  closeError() {
    this.teleForm.reset();
    this.errorMsgs = [];
    this.error = false;
  }

  back() {
    this.navCtrl.navigateBack(['/phone-number']);
  }

  ngOnDestroy() {
    unsubscriberHelper(this.sub);
  }
}
