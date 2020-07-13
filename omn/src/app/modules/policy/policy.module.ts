import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PolicyRoutingModule } from './policy-routing.module';
import { PolicySharedModule } from './policy-shared.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, PolicyRoutingModule, PolicySharedModule],
})
export class PolicyModule {}
