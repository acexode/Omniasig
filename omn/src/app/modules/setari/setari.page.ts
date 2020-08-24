import { Component, OnInit } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-setari',
  templateUrl: './setari.page.html',
  styleUrls: ['./setari.page.scss'],
})
export class SetariPage implements OnInit {
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Setări'),
  };

  constructor(
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

}
