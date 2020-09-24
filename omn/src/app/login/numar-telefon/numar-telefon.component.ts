import { unsubscriberHelper } from './../../core/helpers/unsubscriber.helper';
import { Subscription } from 'rxjs';
import { RegistrationService } from 'src/app/core/services/auth/registration.service';
import { Component, OnInit, HostBinding, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { IonInputConfig } from './../../shared/models/component/ion-input-config';
import { get } from 'lodash';

@Component({
  selector: 'app-numar-telefon',
  templateUrl: './numar-telefon.component.html',
  styleUrls: ['./numar-telefon.component.scss'],
})
export class NumarTelefonComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  label: IonTextItem = {
    text: 'Numărul tău de telefon',
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
    inputClasses: 'ion-item-right',
    minLength: 10,
    maxLength: 10,
  };
  teleForm: FormGroup;
  busy = false;
  navESub: Subscription;
  fieldValidS: Subscription;
  errorLogin = '';

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private route: ActivatedRoute,
    private regService: RegistrationService
  ) {
    this.checkHasLoggedIn();
  }

  ngOnInit() {
    this.initForm();
    this.handleNavError();
  }
  handleNavError() {
    this.navESub = this.route.queryParams.subscribe((qP) => {
      if (qP && get(qP, 'expired', false)) {
        // This tells the user that the session has expired.
        this.errorLogin =
          'Sesiunea a expirat, autentificati-va pentru a continua...';
      }
    });
  }
  initForm() {
    this.teleForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^07[0-9].*$/),
          Validators.minLength(10),
        ],
      ],
    });

    this.fieldValidS = this.phoneNumber.valueChanges.subscribe((v) => {
      this.errorLogin = null;
    });
  }

  login() {
    this.busy = true;
    this.auth.findUserByPhoneNumber(this.phoneNumber.value).subscribe(
      (data) => {
        this.requestSms();
      },
      (err) => {
        this.newUserReg();
        this.busy = false;
      }
    );
  }

  get phoneNumber() {
    return this.teleForm.get('phoneNumber');
  }

  newUserReg() {
    this.regService.setUserObj({
      phoneNumber: this.phoneNumber.value,
      userName: this.phoneNumber.value,
    });
    this.regService.RegisterPhoneNumber(this.phoneNumber.value).subscribe(
      (data) => {
        this.busy = false;
        this.router.navigate(['registration/confirm-number']);
      },
      (err) => {
        this.busy = false;
      }
    );
  }

  checkHasLoggedIn() {
    this.auth.getPhoneNumber().subscribe((phoneNumber) => {
      if (phoneNumber) {
        this.router.navigate(['login/verify', phoneNumber], {
          preserveQueryParams: true,
        });
      }
    });
  }

  requestSms() {
    this.auth.sendPhoneNumberSms(this.phoneNumber.value).subscribe(
      (data) => {
        this.busy = false;
        this.router.navigate(['login/authenticate', this.phoneNumber.value]);
        this.teleForm.reset();
      },
      (err) => {
        this.busy = false;
      }
    );
  }
  ngOnDestroy() {
    unsubscriberHelper(this.navESub);
    unsubscriberHelper(this.fieldValidS);
  }
}
