import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { take } from 'rxjs/operators';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { PadService } from '../../services/pad.service';
import { PolicyDataService } from '../../services/policy-data.service';

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
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: any) => {
      this.getPolicyById(params.id);
    });
  }

  getPolicyById(id) {
    this.policyDataService.getSingleOfferById(id).subscribe((offer) => {
      this.offer = offer;
    });
  }

  closeOffer() {
    this.navCtrl.navigateRoot('/policy');
  }

  back() {}

  pay() {
    /*
      method to call payment web service when the pay(plateste) button is clicked,
      which also calls create PAD Insurance policy web service
    */

    this.padS.CreatePADInsurancePolicy(this.offer.id).subscribe(
      (result) => {
        this.policyDataService.initData();
        this.navCtrl.navigateRoot('/policy');
        // next thing to do after creating PAD Insurance policy
      },
      (error) => {
        // handle error
        this.navCtrl.navigateRoot('/policy');
      }
    );
  }
}
