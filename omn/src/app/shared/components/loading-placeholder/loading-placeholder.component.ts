import { Component, Input, OnInit } from '@angular/core';
import { subPageHeaderDefault } from '../../data/sub-page-header-default';
import { SubPageHeader } from '../../models/component/sub-page-header';

@Component({
  selector: 'app-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
  styleUrls: ['./loading-placeholder.component.scss'],
})
export class LoadingPlaceholderComponent implements OnInit {
  @Input()
  title = 'Verificăm datele în portalul PAID…';

  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Verificare'),
    leadingIcon: null,
  };

  constructor() {}

  ngOnInit() {}
}
