import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { get } from 'lodash';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { PadService } from '../../services/pad.service';
import { PolicyDataService } from './../../services/policy-data.service';
import { PaidExternalService } from '../../services/paid-external-service.service';

@Component({
  selector: 'app-policy-verify',
  templateUrl: './policy-verify.component.html',
  styleUrls: ['./policy-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyVerifyComponent implements OnInit {
  policyID;
  checkData = false;
  loaderTitle = 'Verificăm corectitudinea datelor…';
  locuintaDataId;
  @Input() offerData: PolicyOffer;
  @Output() calculateEvent: EventEmitter<any> = new EventEmitter();
  @Output() goToErrorHandler: EventEmitter<any> = new EventEmitter();

  constructor(
    private policyS: PolicyDataService,
    private navCtrl: NavController,
    private aRoute: ActivatedRoute,
    private padS: PadService,
    private paidS: PaidExternalService
  ) {}

  ngOnInit() {
    this.policyID = this.aRoute.snapshot.queryParamMap.get('policyID');
  }

  addOffer() {
    this.checkData = true;
    this.locuintaDataId = this.paidS.locationId;

    this.padS
      .CreatePADInsuranceOffer(
        this.locuintaDataId,
        this.offerData.policy.dates.from,
        false
      )
      .subscribe(
        (result) => {
          this.padS
            .CreatePADInsuranceOffer(
              this.locuintaDataId,
              this.offerData.policy.dates.from,
              true
            )
            .subscribe(
              (result2) => {
                this.policyS.addOfferToStore(this.offerData, result2).subscribe(
                  (v) => {
                    if (v) {
                      const id = get(v, 'id', null);
                      if (id) {
                        this.navCtrl.navigateForward(['/policy', 'offer', id]);
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
    this.calculateEvent.emit();
  }
}
