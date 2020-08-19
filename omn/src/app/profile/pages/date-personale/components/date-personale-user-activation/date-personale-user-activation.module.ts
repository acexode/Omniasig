import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatePersonaleUserActivationPageRoutingModule } from './date-personale-user-activation-routing.module';

import { DatePersonaleUserActivationPage } from './date-personale-user-activation.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePersonaleUserActivationPageRoutingModule,
    SharedModule,
  ],
  declarations: [DatePersonaleUserActivationPage]
})
export class DatePersonaleUserActivationPageModule {}
