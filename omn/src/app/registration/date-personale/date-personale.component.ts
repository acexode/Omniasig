import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/auth/registration.service';
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
      minLength: 13
    },
  };

  radiosConfig: IonRadiosConfig = radiosConfigHelper({
    label: '',
    mode: 'item',
  });
  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Da', id: true },
    { label: 'Nu', id: false },
  ];

  constructor(private formBuilder: FormBuilder, private router: Router, private regService: RegistrationService) {
    this.radiosConfig.itemClasses = 'w-40 pr-60 inline-flex bg-white';
    this.checkUserObj()
  }

  ngOnInit() {
    this.initForm();
  }

  checkUserObj() {
    if (!this.regService.getuserObj?.phoneNumber || !this.regService.getuserObj?.userName || !this.regService.getuserObj?.pin) {
      this.router.navigate(["/registration"])
    }
  }

  proceed() {
    this.regService.setUserObj({ ...this.detailsForm.value })
    this.router.navigate(['registration/email']);
  }

  initForm() {
    this.detailsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      cnp: ['', [Validators.required, Validators.minLength(13)]],
      isPublicPerson: ['', [Validators.required]],
      marketing: [false],
      roles: [["MobileUser"]]
    })
  }
}
