import { Component, OnInit } from '@angular/core';
import { dntItemHelper } from 'src/app/shared/modules/dnt/data/dnt-item-helper';
import { DntConfig } from 'src/app/shared/modules/dnt/models/dnt-config';

@Component({
  selector: 'app-policy-form',
  templateUrl: './policy-form.page.html',
  styleUrls: ['./policy-form.page.scss'],
})
export class PolicyFormPage implements OnInit {
  dntConfig: DntConfig = {
    items: [dntItemHelper()],
    success: dntItemHelper(),
    cancel: dntItemHelper(),
  };
  dntConfigItem = dntItemHelper();
  constructor() {}

  ngOnInit() {}
}
