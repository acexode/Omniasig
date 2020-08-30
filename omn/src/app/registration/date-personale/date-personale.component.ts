import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { radiosConfigHelper } from 'src/app/shared/data/radios-config-helper';
import { subPageHeaderTertiary } from 'src/app/shared/data/sub-page-header-tertiary';
import { IonRadioInputOption } from 'src/app/shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/component/ion-radios-config';

@Component({
  selector: 'app-date-personale',
  templateUrl: './date-personale.component.html',
  styleUrls: ['./date-personale.component.scss'],
})
export class DatePersonaleComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderTertiary('');
  detailsForm: FormGroup;
  config: any = {
    nume: {
      placeholder: 'Ionescu',
      type: 'text',
      inputMode: 'text',
      size: 100,
      inputLabel: {
        text: 'Nume',
        classes: 'w-100 bg-white pb-8',
      },
      clearable: true,
      inputClasses: '',
    },
    prenume: {
      placeholder: '',
      type: 'text',
      inputMode: 'text',
      size: 100,
      inputLabel: {
        text: 'Prenume',
        classes: 'w-100 bg-white pb-8',
      },
      clearable: true,
      inputClasses: '',
    },
    cnp: {
      placeholder: '',
      type: 'number',
      inputMode: 'number',
      size: 100,
      inputLabel: {
        text: 'CNP',
        classes: 'w-100 bg-white pb-8',
      },
      clearable: true,
      inputClasses: '',
    },
  };

  radiosConfig: IonRadiosConfig = radiosConfigHelper({
    label: '',
    mode: 'item',
  });
  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Da', id: 1 },
    { label: 'Nu', id: 0 },
  ];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.radiosConfig.itemClasses = 'w-40 pr-60 inline-flex bg-white';
  }

  ngOnInit() {
    this.initForm();
  }

  proceed() {
    this.router.navigate(['registration/email']);
  }
  initForm() {
    this.detailsForm = this.formBuilder.group({
      nume: ['', [Validators.required, Validators.minLength(3)]],
      prenume: ['', [Validators.required, Validators.minLength(3)]],
      cnp: ['', [Validators.required, Validators.minLength(13), Validators.maxLength(13)]],
      option: ['', [Validators.required]],
    });
  }
}