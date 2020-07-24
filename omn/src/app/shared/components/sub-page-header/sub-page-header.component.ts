import { Component, Input, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonIconItem } from '../../models/component/ion-icon-item';
import { SubPageHeader } from '../../models/component/sub-page-header';
import { get } from 'lodash';

@Component({
  selector: 'app-sub-page-header',
  templateUrl: './sub-page-header.component.html',
  styleUrls: ['./sub-page-header.component.scss'],
})
export class SubPageHeaderComponent implements OnInit {
  @Input() config: SubPageHeader;

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  backAction(iconConf?: IonIconItem) {
    const rLink = iconConf ? get(iconConf, 'routerLink', null) : null;
    if (rLink === null) {
      this.navCtrl.back();
    } else {
      this.navCtrl.navigateBack(rLink);
    }
  }
  trailingAction() {}
}
