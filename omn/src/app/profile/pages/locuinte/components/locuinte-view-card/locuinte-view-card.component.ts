import { locuinteFieldsData } from 'src/app/shared/data/locuinte-field-data';
import { get } from 'lodash';
import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { getTommorrowUTCdate } from 'src/app/core/helpers/date.helper';
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
  checking = false;
  constructor(
    public modalController: ModalController,
    private ampS: AmplusService
  ) {}

  ngOnInit() {}

  getAmplus() {
    this.checking = true;
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
      propertyCessionList: null,
    };
    this.ampS
      .CreateAmplusInsuranceOffer(this.locuintaData.id, generateOffer, payload)
      .subscribe(
        (data) => {
          Promise.resolve(
            this.presentModal(
              get(data, 'response.ofertaResponse.prima', null),
              get(data, 'response.ofertaResponse.moneda', null)
            )
          );
          this.checking = false;
        },
        (err) => {
          Promise.resolve(this.presentModal(null, null));
          this.checking = false;
        },
        () => {
          this.checking = false;
        }
      );
  }

  async presentModal(prima = 0, currency = 'RON') {
    const findC = locuinteFieldsData.valueCurrency.find((cc) => {
      return get(cc, 'id', '') === currency;
    });
    if (findC) {
      currency = get(findC, 'label', currency);
    }
    const modal = await this.modalController.create({
      component: PriceModalComponent,
      cssClass: 'disabled-message-modal-class',
      componentProps: {
        variant: this.variant,
        prima,
        currency: currency ? currency.toLowerCase() : null,
      },
    });
    return await modal.present();
  }
}
