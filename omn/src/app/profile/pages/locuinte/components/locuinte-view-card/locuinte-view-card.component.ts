import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AmplusService } from 'src/app/modules/policy/services/amplus.service';
import { PriceModalComponent } from '../../../components/modals/price-modal/price-modal.component';

@Component({
  selector: 'app-locuinte-view-card',
  templateUrl: './locuinte-view-card.component.html',
  styleUrls: ['./locuinte-view-card.component.scss'],
})
export class LocuinteViewCardComponent implements OnInit {
  @Input() variant;
  constructor(public modalController: ModalController, private ampS: AmplusService) {}

  ngOnInit() {}

  getAmplus(){
    const amplusAddressId = 79;
    const generateOffer = false;
    // payload
    /* {
      "isVip": true,
      "isGold": true,
        "mentiuni": "string",
          "startDate": "2020-09-23T07:26:13.614Z",
            "numberOfMonths": "string",
              "insurancePrice": 0,
                "numberOfPayments": "string",
                  "paymentCurrency": "string",
                    "propertyCessionList": [
                      {
                        "id": 0,
                        "cui": "string",
                        "procentage": 0,
                        "name": "string"
                      }
                    ];
    } */
    this.ampS.CreateAmplusInsuranceOffer( amplusAddressId, generateOffer, { id: 1 } )
      .subscribe( d => console.log( d ) );
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: PriceModalComponent,
      cssClass: 'disabled-message-modal-class',
    });
    return await modal.present();
  }
}
