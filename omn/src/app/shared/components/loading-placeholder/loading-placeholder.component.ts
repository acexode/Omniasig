import { Component, OnInit, Input } from '@angular/core';
import { SubPageHeader } from '../../models/component/sub-page-header';
import { subPageHeaderDefault } from '../../data/sub-page-header-default';

@Component({
  selector: 'app-loading-placeholder',
  templateUrl: './loading-placeholder.component.html',
  styleUrls: ['./loading-placeholder.component.scss'],
})
export class LoadingPlaceholderComponent implements OnInit {
  @Input()
  title: string = 'Verificăm datele în portalul PAID…';

  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Verificare'),
    leadingIcon: null,
  };

  constructor() { }

  ngOnInit() {}

}
