import { Component, OnInit, HostBinding } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';

@Component({
  selector: 'app-despre-noi',
  templateUrl: './despre-noi.page.html',
  styleUrls: ['./despre-noi.page.scss'],
})
export class DespreNoiPage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = {
    ...subPageHeaderPrimary(''),
    trailingIcon: null,
  };

  constructor() {}

  ngOnInit() {}
}
