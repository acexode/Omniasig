import { Component, OnInit, HostBinding } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';

@Component({
  selector: 'app-change-access-code',
  templateUrl: './change-access-code.component.html',
  styleUrls: ['./change-access-code.component.scss'],
})
export class ChangeAccessCodeComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = subPageHeaderDefault('Cod de access nou');
  inputConfig: IonInputConfig = {
    type: 'password',
    inputClasses: 'ion-text-center'
  };

  constructor() { }

  ngOnInit() {}

}
