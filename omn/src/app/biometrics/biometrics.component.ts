import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
// import { IonInputConfig } from '../../../../shared/models/component/ion-input-config';
// import { unsubscriberHelper } from './../../../../core/helpers/unsubscriber.helper';
// import { inputConfigHelper } from './../../../../shared/data/input-config-helper';
import { radiosConfigHelper } from '../shared/data/radios-config-helper';
import { IonRadioInputOption } from '../shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from '../shared/models/component/ion-radios-config';

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.scss'],
})
export class BiometricsComponent implements OnInit {

  radiosConfig: IonRadiosConfig = radiosConfigHelper({
    label: '',
    mode: 'item',
  });

  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Sunt de acord', id: 0 },
    { label: 'Nu sunt de acord', id: 1 },
  ];

  userAgrees?: number;

  constructor() { 
    this.radiosConfig.itemClasses = 'w-50 inline-flex';
    this.radiosConfig.inputLabel.classes = 'mb-16';
  }

  ngOnInit() {}

}
