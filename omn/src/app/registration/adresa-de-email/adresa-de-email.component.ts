import { AuthService } from 'src/app/core/services/auth/auth.service';
import { genericErrorTexts } from './../../shared/data/generic-error-helper';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/auth/registration.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { switchMap } from 'rxjs/operators';
import { of, throwError } from 'rxjs';
import { get } from 'lodash';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-adresa-de-email',
  templateUrl: './adresa-de-email.component.html',
  styleUrls: ['./adresa-de-email.component.scss'],
})
export class AdresaDeEmailComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  label: IonTextItem = {
    text: 'Email',
  };
  config: IonInputConfig = {
    placeholder: '',
    type: 'email',
    inputMode: 'email',
    size: 100,
    inputLabel: this.label,
    clearable: false,
  };
  emailForm: FormGroup;
  headerConfig = subPageHeaderDefault('');
  busy = false;
  errorMsgs = [];
  showError = false;
  isGDPRokStatus = true;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private regSrvice: RegistrationService,
    private auth: AuthService,
    private navCtrl: NavController,
  ) {
    this.checkUserObj();
  }

  ngOnInit() {
    this.initForm();
  }

  checkUserObj() {
    if (
      !this.regSrvice.getuserObj?.phoneNumber ||
      !this.regSrvice.getuserObj?.userName ||
      !this.regSrvice.getuserObj?.pin
    ) {
      this.router.navigate(['/registration']);
    }
  }

  initForm() {
    this.emailForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(4)],
      ],
    });
  }

  proceed() {
    this.busy = true;
    this.regSrvice.setUserObj({
      email: this.emailForm.get('email').value,
    });
    this.regSrvice.registerUser().subscribe(
      (data) => {
        this.logUserIn();
      },
      (err) => {
        this.busy = false;
      }
    );
  }

  logUserIn() {
    this.auth
      .login({
        phone: this.regSrvice.getuserObj.phoneNumber,
        password: this.regSrvice.getuserObj.pin,
        aRoute: '/registration/account-created',
      })
      .pipe(
        switchMap((res) => {
          return this.auth.checkGDPR(this.regSrvice.getuserObj.cnp)
          .pipe(
            switchMap((isGDPRok) => {
              this.isGDPRokStatus = get(isGDPRok, 'isGDPRNotRestricted', true);
              if (this.isGDPRokStatus) {
                return of(null);
              } else {
                return throwError('falseGDPR');
              }
            })
          );
        })
      )
      .subscribe(
        (data) => {
          this.auth.saveLastLoginNumber(this.regSrvice.getuserObj.phoneNumber);
        },
        (err) => {
          this.busy = false;
          if (err === 'falseGDPR') {
            this.errorMsgs = genericErrorTexts( 'lipsa acordului tău privind procesare datelor personale.', '' );
            this.showError = true;
          } else {
            this.router.navigate(['/login']);
          }
        }
      );
  }

  goBack() {
    if (!this.isGDPRokStatus) {
      // logout if generic error is due to isGDPRok===false
      this.auth.doLogout();
    }
  }
}
