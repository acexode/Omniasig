import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-change-phone-number',
  templateUrl: './change-phone-number.component.html',
  styleUrls: ['./change-phone-number.component.scss'],
})
export class ChangePhoneNumberComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Schimbare număr  telefon');
  label: IonTextItem = {
    text: 'Introdu noul număr de telefon',
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
    maxLength: 11,
  };
  teleForm: FormGroup;
  constructor(private router: Router, private formBuilder: FormBuilder) {}

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

  proceed() {
    this.router.navigate([
      'phone-number/confirm-number',
      this.teleForm.controls['phoneNumber'].value,
    ]);
  }
}