import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';

@Component({
  selector: 'app-info-doc',
  templateUrl: './info-doc.component.html',
  styleUrls: ['./info-doc.component.scss'],
})
export class InfoDocComponent implements OnInit {
  headerConfig = subPageHeaderSecondary('Document de Informare');
  @HostBinding('class') color = 'ion-color-white-page';
  constructor() {}

  ngOnInit() {}
}
