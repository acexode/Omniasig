import { Component, OnInit } from '@angular/core';
import { policyTypes } from 'src/app/shared/models/data/policy-types';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.page.html',
  styleUrls: ['./policy-form.page.scss'],
})
export class PolicyFormPage implements OnInit {
  typeV = 'PAD';
  typeItem = policyTypes[this.typeV];
  dntConfig = this.typeItem.dntConfig;
  constructor() {}

  ngOnInit() {}
}
