import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/auth/registration.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

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
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private regSrvice: RegistrationService,
    private auth: AuthService
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
      .subscribe(
        (data) => {
          this.auth.saveLastLoginNumber(this.regSrvice.getuserObj.phoneNumber);
        },
        (err) => {
          this.busy = false;
          this.router.navigate(['/login']);
        }
      );
  }
}
