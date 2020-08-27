import { Component, OnInit, HostBinding } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-price-modal',
  templateUrl: './price-modal.component.html',
  styleUrls: ['./price-modal.component.scss'],
})
export class PriceModalComponent implements OnInit {
  // @HostBinding('class') color = 'ion-color-white-page';
  item: any;
  description: any;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
