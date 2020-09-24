import { Component, OnInit, HostBinding, Input } from '@angular/core';
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
  // Data passed in by componentProps
  @Input() prima: number;
  @Input() variant: string;

  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {
  }

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
