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

@Component({
  selector: 'app-policy-verify',
  templateUrl: './policy-verify.component.html',
  styleUrls: ['./policy-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyVerifyComponent implements OnInit {
  policyID;
  @Input() offerData: PolicyOffer;
  @Output() calculateEvent: EventEmitter<any> = new EventEmitter();
  @Output() goToErrorHandler: EventEmitter<any> = new EventEmitter();
  constructor(
    private policyS: PolicyDataService,
    private navCtrl: NavController,
    private aRoute: ActivatedRoute,
    private padS: PadService
  ) {}

  ngOnInit() {
    this.policyID = this.aRoute.snapshot.queryParamMap.get('policyID');
  }
  addOffer() {
    this.padS
      .CreatePADInsuranceOffer(
        this.offerData.policy.locuintaData.id,
        this.offerData.policy.locuintaData.id,
        this.offerData.policy.dates.from
      )
      .subscribe(
        (result) => {
          this.policyS.addOfferToStore(this.offerData, result).subscribe(
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
          const eroare = get(
            error,
            'error.emitereOfertaResponse1.eroare',
            false
          );
          const mesaj = get(error, 'error.emitereOfertaResponse1.mesaj', '');
          if (eroare && mesaj) {
            this.goToErrorHandler.emit(mesaj);
          } else {
            this.goToErrorHandler.emit();
          }
        }
      );
  }

  calculatePrice() {
    this.calculateEvent.emit();
  }
}
