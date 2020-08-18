import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { get } from 'lodash';
import { IonInputConfig } from '../../../../shared/models/component/ion-input-config';
import { radiosConfigHelper } from './../../../../shared/data/radios-config-helper';
import { IonRadioInputOption } from './../../../../shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from './../../../../shared/models/component/ion-radios-config';
import { EnumCesiuneItem } from './../models/cesiune-item';

@Component({
  selector: 'app-cesiune-form',
  templateUrl: './cesiune-form.component.html',
  styleUrls: ['./cesiune-form.component.scss'],
})
export class CesiuneFormComponent implements OnInit {
  @Input() config: IonInputConfig;

  radioValue = false;
  numberOfItems = 1;
  cesuineItems: EnumCesiuneItem[];

  radiosConfig: IonRadiosConfig = radiosConfigHelper({
    label: 'Exista o cesiune?',
    mode: 'item',
  });
  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Da', id: 1 },
    { label: 'Nu', id: 0 },
  ];

  public userForm: FormGroup;
  censionar: FormArray;

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      censionar: this.fb.array([this.createItem()]),
    });
  }

  createItem(): FormGroup {
    return this.fb.group({
      cui: '',
      procent: '',
      denumireCesionar: '',
    });
  }

  increaseItems(event) {
    const max = get(this.config, 'max', 2);
    const step = get(this.config, 'step', 1);
    if (this.numberOfItems < 2 && this.numberOfItems !== 2) {
      this.censionar = this.userForm.get('censionar') as FormArray;
      this.censionar.push(this.createItem());

      this.numberOfItems++;
    }
  }

  decreaseItems(event) {
    const min = get(this.config, 'min', 1);
    const step = get(this.config?.spinnerConfig?.step, 'step', 1);
    if (this.numberOfItems > 1) {
      this.numberOfItems--;
      this.censionar.removeAt(this.numberOfItems);
    }
  }

  get itemControls() {
    return this.userForm.get('censionar')['controls'];
  }

  radioHandler(event: any) {
    event.target.value === 'da'
      ? (this.radioValue = true)
      : (this.radioValue = false);
  }

  onSubmit() {
    this.cesuineItems = this.userForm.value;
  }

  ngOnInit() {}
}
