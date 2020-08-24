import { Component, OnInit } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault(''),
    trailingIcon: null,
  }

  constructor() { }

  ngOnInit() {
  }

}
