import { Component, HostBinding, OnInit } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderPrimary } from '../../shared/data/sub-page-header-primary';

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.page.html',
  styleUrls: ['./call-center.page.scss'],
})
export class CallCenterPage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = {
    ...subPageHeaderPrimary('Call Center'),
    leadingIcon: null,
  };

  constructor() {
    this.headerConfig.trailingIcon.routerLink = '/home';
  }

  ngOnInit() {}
}
