import { NavController } from '@ionic/angular';
import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { ActivatedRoute } from '@angular/router';
import { PolicyDataService } from '../../services/policy-data.service';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { PadService } from '../../services/pad.service'

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  offer: any;
  headerConfig = subPageHeaderSecondary('Oferta de asigurare');
  @HostBinding('class') color = 'ion-color-white-page';

  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private padS: PadService,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((params: any) => {
      this.getPolicyById(params.id);
      console.log('OFFER RECEIVED', this.offer)
    });
  }

  ngOnInit(): void {}

  getPolicyById(id) {
    this.policyDataService.getSingleOfferById(id).subscribe((offer) => {
      this.offer = offer;
    });
  }

  closeOffer() {
    this.navCtrl.navigateRoot('/policy');
  }

  back() {}
  
 
  pay(){
     /* 
      method to call payment web service when the pay(plateste) button is clicked,
      which also calls create PAD Insurance policy web service
    */
    
    this.padS.CreatePADInsurancePolicy(1)
            .subscribe(
              (result)=>{
                console.log("INSURANCE POLICY CREATED", result)
              },
              (error)=>{
                console.log("FAILED TO CREATE INSURANCE POLICY", error)
              }
            )
  }
}
