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
  busy: boolean = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private regSrvice: RegistrationService
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
      email: this.emailForm.controls['email'].value,
    });
    this.regSrvice.registerUser().subscribe(
      (data) => {
        this.busy = false;
        this.router.navigate(['registration/account-created']);
      },
      (err) => {
        this.busy = false;
      }
    );
  }
}
