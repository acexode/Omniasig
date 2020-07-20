import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocuintePageRoutingModule } from './locuinte-routing.module';

import { LocuintePage } from './locuinte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocuintePageRoutingModule
  ],
  declarations: [LocuintePage]
})
export class LocuintePageModule {}
