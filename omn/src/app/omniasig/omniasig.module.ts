import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { OmniasigRoutingModule } from './omniasig-routing.module';
import { FaqComponent } from './faq/faq.component'

@NgModule({
  declarations: [FaqComponent],
  imports: [
    CommonModule,
    IonicModule,
    OmniasigRoutingModule
  ]
})
export class OmniasigModule { }
