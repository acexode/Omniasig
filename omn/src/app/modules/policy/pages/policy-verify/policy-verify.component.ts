import { Component, Input, OnInit } from '@angular/core';
import { PolicyItem } from '../../../../shared/models/data/policy-item';

@Component({
  selector: 'app-policy-verify',
  templateUrl: './policy-verify.component.html',
  styleUrls: ['./policy-verify.component.scss'],
})
export class PolicyVerifyComponent implements OnInit {
  @Input() policyData: PolicyItem = null;

  constructor() {}

  ngOnInit() {}
}
