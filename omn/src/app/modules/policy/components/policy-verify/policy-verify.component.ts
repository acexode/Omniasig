import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { get } from 'lodash';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { AmplusService } from '../../services/amplus.service';
import { PadService } from '../../services/pad.service';
import { PolicyDataService } from './../../services/policy-data.service';

@Component({
  selector: 'app-policy-verify',
  templateUrl: './policy-verify.component.html',
  styleUrls: ['./policy-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyVerifyComponent implements OnInit {
  policyID;
  @Input() offerData: PolicyOffer;
  @Output() createOfferEvent: EventEmitter<any> = new EventEmitter();
  @Output() goToErrorHandler: EventEmitter<any> = new EventEmitter();

  constructor(
    private policyS: PolicyDataService,
    private navCtrl: NavController,
    private aRoute: ActivatedRoute,
    private padS: PadService,
    private amplusS: AmplusService
  ) {}

  ngOnInit() {
    this.policyID = this.aRoute.snapshot.queryParamMap.get('policyID');
  }

  addOffer() {
    this.createOfferEvent.emit();
    this.padS
      .CreatePADInsuranceOffer(
        this.offerData.policy.locuintaData.id,
        this.offerData.policy.dates.from,
        true
      )
      .subscribe(
        (result) => {
          this.policyS
            .addOfferToStore(this.offerData, result, this.policyID)
            .subscribe(
              (v) => {
                if (v) {
                  const id = get(v, 'id', null);
                  if (id) {
                    this.navCtrl.navigateForward(['/policy', 'offer', id], {
                      queryParams: { policyType: 'PAD' },
                    });
                  } else {
                    this.navCtrl.navigateRoot(['/policy']);
                  }
                } else {
                  // We'll probably only show an error in here.
                }
              },
              (err) => {
                this.goToErrorHandler.emit(err);
              }
            );
        },
        (error) => {
          this.processErrorMessage(error);
        }
      );
  }

  processErrorMessage(error) {
    const eroare = get(error, 'error.emitereOfertaResponse1.eroare', false);
    const mesaj = get(error, 'error.emitereOfertaResponse1.mesaj', '');
    if (eroare && mesaj) {
      this.goToErrorHandler.emit(mesaj);
    } else {
      this.goToErrorHandler.emit();
    }
  }

  calculatePrice() {
    this.createOfferEvent.emit();
    const payload = {
      isVip: this.offerData?.supportData?.plan === 'vip' ? true : false,
      isGold: this.offerData?.supportData?.plan === 'gold' ? true : false,
      mentiuni: 'self',
      startDate: this.offerData?.policy?.dates?.from,
      numberOfMonths: '12',
      insurancePrice: 100000,
      numberOfPayments: this.offerData?.payData?.rate,
      paymentCurrency: this.offerData?.payData?.type,
      propertyCessionList: null,
    };

    if (this.policyID === 'AMPLUS') {
      this.amplusS.CreateAmplusInsuranceOffer(
          this.offerData.policy.locuintaData.id,
          true,
          payload
        )
        .subscribe(
          (result) => {
            this.policyS
              .addOfferToStore(this.offerData, result, this.policyID)
              .subscribe(
                (v) => {
                  if (v) {
                    const id = get(v, 'id', null);
                    if (id) {
                      const navigationExtras: NavigationExtras = {
                        queryParams: {
                          policyType: this.policyID,
                        },
                      };
                      this.navCtrl.navigateForward(
                        ['/policy', 'offer', id],
                        navigationExtras
                      );
                    } else {
                      this.navCtrl.navigateRoot(['/policy']);
                    }
                  } else {
                    // We'll probably only show an error in here.
                  }
                },
                (err) => {
                  this.goToErrorHandler.emit(err);
                }
              );
          },
          (error) => {
            const eroare = get(error, 'error.ofertaResponse.eroare', false);
            const mesaj = get(error, 'error.ofertaResponse.mesaj', '');
            if (eroare && mesaj) {
              this.goToErrorHandler.emit(mesaj);
            } else {
              this.goToErrorHandler.emit();
            }
          }
        );
    }else{
      this.padS
      .CreatePADInsuranceOffer(
        this.offerData.policy.locuintaData.id,
        this.offerData.policy.dates.from,
        true
      )
      .subscribe(
        (result) => {
          this.policyS
            .addOfferToStore(this.offerData, result, 'PAD')
            .subscribe(
              (v) => {
                if (result) {
                  const id = get(v, 'id', null);
                  if (id) {
                    // FOR AMPLUS+PAD
                    this.amplusS.CreateAmplusPadInsuranceOffer(
                        this.offerData.policy.locuintaData.id,
                        true,
                        payload,
                        id
                      )
                      .subscribe((amplusPadOfferResponse) => {
                          this.policyS
                            .addOfferToStore(this.offerData, amplusPadOfferResponse, this.policyID)
                            .subscribe((val) => {
                                if (val) {
                                  const idV = get(val, 'id', null);
                                  if (idV) {
                                    const navigationExtras: NavigationExtras = {
                                      queryParams: {
                                        policyType: this.policyID,
                                      },
                                    };
                                    this.navCtrl.navigateForward(
                                      ['/policy', 'offer', idV],
                                      navigationExtras
                                    );
                                  } else {
                                    this.navCtrl.navigateRoot(['/policy']);
                                  }
                                } else {
                                  // We'll probably only show an error in here.
                                }
                              },
                              (err) => {
                                this.goToErrorHandler.emit(err);
                              }
                            );
                        },
                        (error) => {
                          const eroare = get(error, 'error.ofertaResponse.eroare', false);
                          const mesaj = get(error, 'error.ofertaResponse.mesaj', '');
                          if (eroare && mesaj) {
                            this.goToErrorHandler.emit(mesaj);
                          } else {
                            this.goToErrorHandler.emit();
                          }
                        }
                      );
                  } else {
                    this.navCtrl.navigateRoot(['/policy']);
                  }
                } else {
                  // We'll probably only show an error in here.
                }
              },
              (err) => {
                this.goToErrorHandler.emit(err);
              }
            );
        },
        (error) => {
          this.processErrorMessage(error);
        }
      );
    }
  }
}
