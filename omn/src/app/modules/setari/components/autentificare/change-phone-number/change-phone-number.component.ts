import { Component, OnInit, HostBinding } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';

@Component({
  selector: 'app-change-phone-number',
  templateUrl: './change-phone-number.component.html',
  styleUrls: ['./change-phone-number.component.scss'],
})
export class ChangePhoneNumberComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = subPageHeaderDefault('Schimbare număr telefon');

  inputConfig: IonInputConfig = {
    clearable: true,
    placeholder: '07XX XXX XXX',
    inputLabel: {
      text: 'Introdu noul număr de telefon',
    },
  };

  constructor() { }

  ngOnInit() {}

}
