import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { subPageHeaderCustom } from './../../../../shared/data/sub-page-header-custom';
import { PolicyDataService } from './../../services/policy-data.service';

@Component({
  selector: 'app-policy-view',
  templateUrl: './policy-view.component.html',
  styleUrls: ['./policy-view.component.scss'],
})
export class PolicyViewComponent implements OnInit {
  headerConfig = subPageHeaderCustom('Polița PAD', 'bg-state');
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
    this.policyDataService.getSinglePolicyById(id).subscribe((policy) => {
      if (policy) {
      } else {
        this.navCtrl.navigateBack('policy');
      }
    });
  }
}
