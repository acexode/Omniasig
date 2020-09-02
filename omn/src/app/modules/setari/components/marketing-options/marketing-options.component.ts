import { NavController } from '@ionic/angular';
import { Component, HostBinding, OnInit } from '@angular/core';
import { radiosConfigHelper } from 'src/app/shared/data/radios-config-helper';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonRadioInputOption } from 'src/app/shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/component/ion-radios-config';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-marketing-options',
  templateUrl: './marketing-options.component.html',
  styleUrls: ['./marketing-options.component.scss'],
})
export class MarketingOptionsComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Opțiuni de marketing'),
  };

  radiosConfig: IonRadiosConfig = {
    ...radiosConfigHelper({
      label: '',
      mode: 'item',
    }),
    itemClasses: 'mb-32',
  };

  radioOptions: Array<IonRadioInputOption> = [
    { label: 'DA, sunt de acord', id: 1 },
    { label: '*NU, nu sunt de acord', id: 0 },
  ];
  formGroup = this.fb.group({
    accept: this.fb.control('', Validators.required),
  });
  constructor(private fb: FormBuilder, private navCtrl: NavController) {}

  ngOnInit() {}

  submitForm() {
    if (this.formGroup.valid) {
      this.navCtrl.navigateRoot('/home');
    }
  }
}
