import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { IonInputConfig } from './../../shared/models/component/ion-input-config';

@Component({
  selector: 'app-numar-telefon',
  templateUrl: './numar-telefon.component.html',
  styleUrls: ['./numar-telefon.component.scss'],
})
export class NumarTelefonComponent implements OnInit {
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
    inputClasses: 'ion-item-right',
    minLength: 10,
    maxLength: 10
  };
  teleForm: FormGroup;
  busy: boolean = false
  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {
    this.checkHasLoggedIn()
  }

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
          Validators.minLength(10),
        ],
      ],
    });
  }

  login() {
    this.busy = true
    this.auth.findUserByPhoneNumber(this.teleForm.controls["phoneNumber"].value).subscribe(
      data => {
        this.router.navigate([
          'login/authenticate',
          this.teleForm.controls['phoneNumber'].value,
        ]);
        // TODO call the request sms function when the api is ready
        // this.requestSms()
        this.busy = false
      },
      err => {
        this.newUserReg();
      this.busy = false}
    );
  }

  newUserReg() {
    // TODO make http request to register number as he is not a member yet
  }

  checkHasLoggedIn() {
    this.auth.lastLoginNumber().subscribe(
      phoneNumber => {
        if (phoneNumber) {
          this.router.navigate([
            'login/verify',
            phoneNumber,
          ]);
        }
      }
    );
  }

  requestSms() {
    this.auth.sendPhoneNumberSms(this.teleForm.controls['phoneNumber'].value).subscribe(
      data => {
        console.log(data)
        return
        this.router.navigate([
          'login/authenticate',
          this.teleForm.controls['phoneNumber'].value,
        ]);
      },
      err => console.log(err)
    )
  }

}
