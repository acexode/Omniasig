import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DatePersonalePageRoutingModule } from './date-personale-routing.module';

import { DatePersonalePage } from './date-personale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePersonalePageRoutingModule
  ],
  declarations: [DatePersonalePage]
})
export class DatePersonalePageModule {}
