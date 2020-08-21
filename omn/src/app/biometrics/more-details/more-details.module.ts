import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MoreDetailsRoutingModule } from './more-details-routing.module';
import { MoreDetailsComponent } from './more-details.component'


@NgModule({
  declarations: [MoreDetailsComponent],
  imports: [
    CommonModule,
    MoreDetailsRoutingModule
  ]
})
export class MoreDetailsModule { }
