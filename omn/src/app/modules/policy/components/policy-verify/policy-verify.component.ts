import { get } from 'lodash';
import { PolicyDataService } from './../../services/policy-data.service';
import { PadService } from '../../services/pad.service'
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
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

  constructor(
    private policyS: PolicyDataService,
    private padS: PadService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}
  
  addOffer() {
    //call PAD Create Insurance service here
    this.padS.CreatePADInsuranceOffer(4, 4, '2020-09-10').subscribe(
      (result)=>{
        console.log("CREATING INSURANCE OFFER WAS SUCCESSFUL", result, "OFFER DAT", this.offerData)
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
      (error)=>{
        console.log("FAILED TO CREATE INSURANCE OFFER", error)
      }
    )
  }
}
