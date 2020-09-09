import { Component, HostBinding, OnInit } from '@angular/core';
import { radiosConfigHelper } from '../shared/data/radios-config-helper';
import { IonRadioInputOption } from '../shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from '../shared/models/component/ion-radios-config';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-biometrics',
  templateUrl: './biometrics.component.html',
  styleUrls: ['./biometrics.component.scss'],
})
export class BiometricsComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';  
  buttonText = 'Verifică'
  pathAcord = "./more-details"
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

  constructor(private fb: FormBuilder) {
    this.radiosConfig.itemClasses = 'w-50 inline-flex';
    this.radiosConfig.inputLabel.classes = 'mb-16';
  }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe(val =>{      
      if(val.selection){
        this.buttonText = 'Verifică'
        this.pathAcord = "./more-details"
      }else{
        this.buttonText = 'Confirmare identitate'
        this.pathAcord = "./confirmare-identitate"
      }      
    })
  }
}
