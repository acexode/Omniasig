import { NavController } from '@ionic/angular';
import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { ActivatedRoute } from '@angular/router';
import { PolicyDataService } from '../../services/policy-data.service';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  offer: PolicyOffer = null;
  headerConfig = subPageHeaderSecondary('Oferta de asigurare');
  @HostBinding('class') color = 'ion-color-white-page';

  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((params: any) => {
      this.getPolicyById(params.id);
    });
  }

  ngOnInit(): void {}

  getPolicyById(id) {
    this.policyDataService
      .getSingleOfferById(id)
      .subscribe((offer: PolicyOffer) => {
        this.offer = offer;
      });
  }

  closeOffer() {
    this.navCtrl.navigateRoot('/policy');
  }

  back() {}
}
