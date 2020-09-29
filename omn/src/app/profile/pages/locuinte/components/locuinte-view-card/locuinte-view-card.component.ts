import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getTommorrowUTCdate } from 'src/app/core/helpers/date.helper';
import { AmplusService } from 'src/app/modules/policy/services/amplus.service';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { PriceModalComponent } from '../../../components/modals/price-modal/price-modal.component';

@Component( {
  selector: 'app-locuinte-view-card',
  templateUrl: './locuinte-view-card.component.html',
  styleUrls: [ './locuinte-view-card.component.scss' ],
} )
export class LocuinteViewCardComponent implements OnInit {
  @Input() variant: string;
  @Input() locuintaData: Locuinte;
  constructor(
    public modalController: ModalController,
    private ampS: AmplusService,
  ) { }

  ngOnInit() {}

  getAmplus() {
    // generateOffer
    const generateOffer = false;
    // payload
    const payload = {
      isVip: false,
      isGold: true,
      mentiuni: '',
      startDate: getTommorrowUTCdate(), //  e.g '2020-09-28T10:44:17.286Z'
      numberOfMonths: '12',
      insurancePrice: this.locuintaData.value,
      numberOfPayments: '1',
      paymentCurrency: this.locuintaData.valueCurrency,
      propertyCessionList: null
    };
    console.log( payload );
    this.ampS.CreateAmplusInsuranceOffer( this.locuintaData.id, generateOffer, payload )
      .subscribe(
        data => {
          this.presentModal( data.response?.ofertaResponse?.prima );
        },
        err => {
          console.log( err );
        }
      );
  }

  async presentModal( data = 0 ) {
    const modal = await this.modalController.create( {
      component: PriceModalComponent,
      cssClass: 'disabled-message-modal-class',
      componentProps: {
        variant: this.variant,
        prima: data ? data : 0,
      }
    } );
    return await modal.present();
  }
}
