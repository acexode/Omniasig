import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault(''),
    trailingIcon: null,
  };

  constructor() {}

  ngOnInit() {}
}
