import { subPageHeaderDefault } from './../../../../shared/data/sub-page-header-default';
import { PolicyDataService } from './../../services/policy-data.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-policy-view',
  templateUrl: './policy-view.component.html',
  styleUrls: ['./policy-view.component.css']
})
export class PolicyViewComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Polița PAD');
  constructor(private route: ActivatedRoute, private policyDataService: PolicyDataService, private navCtrl: NavController) {
    this.route.params.subscribe((params: any) => {
      this.getPolicyById(params.id)
    })
  }

  ngOnInit(): void {
  }

  getPolicyById(id) {
    console.log(id);
    this.policyDataService.getSinglePolicyById(id).subscribe((policy) => {
      if (policy) {

      } else {
        this.navCtrl.navigateBack("policy")
      }
      console.log(policy);
    })
  }

}
