import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';

@Component({
  selector: 'app-confirmare-info',
  templateUrl: './confirmare-info.component.html',
  styleUrls: ['./confirmare-info.component.scss'],
})
export class ConfirmareInfoComponent implements OnInit {
  headerConfig: SubPageHeader = {
    ...subPageHeaderPrimary('', '/biometrics'),
    trailingIcon: null,
  };
  @HostBinding('class') color = 'ion-color-white-page';

  constructor() {}

  ngOnInit() {}
}
