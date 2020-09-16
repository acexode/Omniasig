import { SettingsService } from './../../services/settings.service';
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
    { label: 'DA, sunt de acord', id: true },
    { label: '*NU, nu sunt de acord', id: false },
  ];
  formGroup = this.fb.group({
    accept: this.fb.control(false, Validators.required),
  });
  busy = false;
  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController,
    private settingsS: SettingsService
  ) {}

  ngOnInit() {
    this.getSettings();
  }

  getSettings() {
    this.settingsS.settings$.subscribe((data) => {
      this.formGroup.get('accept').patchValue(data.marketing);
    });
  }

  submitForm() {
    this.busy = true;
    this.settingsS
      .updateSettings({ marketing: this.formGroup.get('accept').value })
      .subscribe(
        (data) => {
          this.navCtrl.navigateRoot('/home');
        },
        (err) => (this.busy = false)
      );
  }
}
