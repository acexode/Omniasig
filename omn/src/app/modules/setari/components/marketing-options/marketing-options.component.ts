import { Component, OnInit } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonRadiosConfig } from 'src/app/shared/models/component/ion-radios-config';
import { radiosConfigHelper } from 'src/app/shared/data/radios-config-helper';
import { IonRadioInputOption } from 'src/app/shared/models/component/ion-radio-input-option';

@Component({
  selector: 'app-marketing-options',
  templateUrl: './marketing-options.component.html',
  styleUrls: ['./marketing-options.component.scss'],
})
export class MarketingOptionsComponent implements OnInit {
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Opțiuni de marketing'),
  }

  radiosConfig: IonRadiosConfig = {
    ...radiosConfigHelper({
      label: '',
      mode: 'item',
    }),
    itemClasses: 'my-16',
  }

  radioOptions: Array<IonRadioInputOption> = [
    { label: 'DA, sunt de acord', id: 1 },
    { label: '*NU, nu sunt de acord', id: 0 },
  ];

  constructor() { }

  ngOnInit() {}

}
