import { subPageHeaderPrimary } from '../../shared/data/sub-page-header-primary';
import { subPageHeaderSecondary } from '../../shared/data/sub-page-header-secondary';
import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';

@Component({
  selector: 'app-call-center',
  templateUrl: './call-center.page.html',
  styleUrls: ['./call-center.page.scss'],
})
export class CallCenterPage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = {
    ...subPageHeaderPrimary('Call Center'),
    // trailingIcon: null,
    leadingIcon: null
  };

  constructor() {}

  ngOnInit() {}
}
