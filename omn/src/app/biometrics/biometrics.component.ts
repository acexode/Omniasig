import { take } from 'rxjs/operators';
import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../core/services/auth/auth.service';
import { SettingsService } from '../modules/setari/services/settings.service';
import { radiosConfigHelper } from '../shared/data/radios-config-helper';
import { IonRadioInputOption } from '../shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from '../shared/models/component/ion-radios-config';

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.scss'],
})
export class BiometricsComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  buttonText = 'Continuă';
  pathAcord = './more-details';
  formGroup = this.fb.group({
    selection: this.fb.control(null, Validators.required),
  });
  radiosConfig: IonRadiosConfig = radiosConfigHelper({
    label: '',
    mode: 'item',
  });

  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Sunt de acord', id: true },
    { label: 'Nu sunt de acord', id: false },
  ];

  userAgrees?: number;
  busy = false;
  constructor(private fb: FormBuilder, private auth: AuthService, private settingsS: SettingsService) {
    this.radiosConfig.itemClasses = 'w-50 inline-flex';
    this.radiosConfig.inputLabel.classes = 'mb-16';
  }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe((val) => {
      this.updateConsent(val.selection);

    });
  }

  updateConsent(val) {
    this.busy = true;
    this.auth.getAccountData().pipe(take(1)).subscribe(
      (account) => {
        this.settingsS.updateConsent({ isEnabled: val, consentDocumentType: 6, userId: account.userId })
          .subscribe(
            (obs) => {
              if (val) {
                this.pathAcord = './more-details';
              } else {
                this.pathAcord = './confirmare-info';
              }
              this.busy = false;
            },
            err => this.busy = false
          );
      }
    );
  }
}
