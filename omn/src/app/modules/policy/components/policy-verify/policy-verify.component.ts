import { get } from 'lodash';
import { PolicyDataService } from './../../services/policy-data.service';
import { PadService } from '../../services/pad.service';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-policy-verify',
  templateUrl: './policy-verify.component.html',
  styleUrls: ['./policy-verify.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyVerifyComponent implements OnInit {
  @Input() offerData: PolicyOffer;
  @Output() goBack: EventEmitter<any> = new EventEmitter();

  constructor(
    private policyS: PolicyDataService,
    private padS: PadService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  addOffer() {
    this.padS
      .CreatePADInsuranceOffer(
        this.offerData.policy.locuintaData.id,
        this.offerData.policy.locuintaData.id,
        this.offerData.policy.dates.from
      )
      .subscribe(
        (result) => {
          this.policyS.addOffer(this.offerData).subscribe((v) => {
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
          });
        },
        (error) => {
          // handle error (until the error screen is available, go back to the previous form page)
          console.log('ERROR------------------------>', error);
          this.goBack.emit();
        }
      );
  }
}
