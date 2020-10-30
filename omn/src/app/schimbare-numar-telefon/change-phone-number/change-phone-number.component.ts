import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
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
  errMsg;

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

    this.sub = this.teleForm.valueChanges.subscribe( (value) => {
      this.onUserInput(value.phoneNumber);
    });
  }

  onUserInput(phoneNumber: number) {
    if(phoneNumber){
      const val = phoneNumber.toString().length > 1 ? phoneNumber.toString().substr(0, 2) : null;
      const pass = /^[0-9]+$/;
      if ((pass.test(phoneNumber.toString()) && (val === '07' || val === null)) || !phoneNumber) {
        this.label.text = this.pText;
        this.error = false;
      }else{
        this.errMsg = 'Numărul de telefon nu este corect'
        this.label.text = this.fText;
        this.error = true;
      }
    }
  }

  proceed() {
    const newPhoneNumber = this.teleForm.controls.phoneNumber.value;
    this.authS.getAuthState().subscribe((authData) => {
      const { userId } = authData.account;

      this.phS.checkPhoneNumber(newPhoneNumber).subscribe(
        (checkResponse) => {
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
        },
        (err) => {
          this.errMsg = err.error;
          this.isError();
        }
      )
    });
  }

  isError() {
    this.teleForm.reset();
    this.error = true;
  }

  exitFlow() {
    this.navCtrl.navigateBack(['/home']);
  }

  back() {
    this.navCtrl.navigateBack(['/phone-number']);
  }

  ngOnDestroy() {
    unsubscriberHelper(this.sub);
  }
}
