import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AmplusService } from 'src/app/modules/policy/services/amplus.service';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { PriceModalComponent } from '../../../components/modals/price-modal/price-modal.component';

@Component({
  selector: 'app-locuinte-view-card',
  templateUrl: './locuinte-view-card.component.html',
  styleUrls: ['./locuinte-view-card.component.scss'],
})
export class LocuinteViewCardComponent implements OnInit {
  @Input() variant: string;
  @Input() locuintaData: Locuinte;
  constructor(public modalController: ModalController, private ampS: AmplusService) {}

  ngOnInit() {}

  getAmplus(){
    const amplusAddressId = 79;
    const generateOffer = false;
    // payload
    const payload = {
      isVip: true,
      isGold: false,
      mentiuni: '',
      startDate: '2020-09-28T10:44:17.286Z',
      numberOfMonths: '12',
      insurancePrice: 100000,
      numberOfPayments: '1',
      paymentCurrency: 'ron',
      propertyCessionList: null
    };

    this.ampS.CreateAmplusInsuranceOffer( amplusAddressId, generateOffer, payload )
      .subscribe( d => {
        this.presentModal( d.response?.ofertaResponse?.prima);
      } );
  }

  async presentModal( data = 0 ) {
    const modal = await this.modalController.create({
      component: PriceModalComponent,
      cssClass: 'disabled-message-modal-class',
      componentProps: {
        variant: this.variant,
        prima: data ? data : 0,
      }
    });
    return await modal.present();
  }
}
