import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { PriceModalComponent } from '../../../components/modals/price-modal/price-modal.component';

@Component({
  selector: 'app-locuinte-view-card',
  templateUrl: './locuinte-view-card.component.html',
  styleUrls: ['./locuinte-view-card.component.scss'],
})
export class LocuinteViewCardComponent implements OnInit {
  @Input() variant;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: PriceModalComponent,
      cssClass: 'disabled-message-modal-class',
    });
    return await modal.present();
  }
}
