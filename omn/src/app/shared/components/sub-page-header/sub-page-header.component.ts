import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NavController } from '@ionic/angular';
import { get } from 'lodash';
import { IonIconItem } from '../../models/component/ion-icon-item';
import { SubPageHeader } from '../../models/component/sub-page-header';

@Component({
  selector: 'app-sub-page-header',
  templateUrl: './sub-page-header.component.html',
  styleUrls: ['./sub-page-header.component.scss'],
})
export class SubPageHeaderComponent implements OnInit {
  @Input() config: SubPageHeader;
  @Output() backActionEv: EventEmitter<any> = new EventEmitter();
  @Output() trailingActionEv: EventEmitter<any> = new EventEmitter();

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  backAction(iconConf?: IonIconItem) {
    this.handleIconNav(iconConf);
    this.backActionEv.emit();
  }
  trailingAction(iconConf?: IonIconItem) {
    const rLink = iconConf ? get(iconConf, 'routerLink', null) : null;
    const obsL = get(this.trailingActionEv, 'observers.length', 0);
    if (rLink !== false) {
      this.navCtrl.navigateRoot(rLink);
    } else {
      this.trailingActionEv.emit();
      if (!obsL) {
        this.navCtrl.pop();
      }
    }
  }

  handleIconNav(iconConf) {
    const rLink = iconConf ? get(iconConf, 'routerLink', null) : null;
    if (rLink === null) {
      this.navCtrl.back();
    } else {
      if (rLink !== false) {
        this.navCtrl.navigateBack(rLink);
      }
    }
  }
}
