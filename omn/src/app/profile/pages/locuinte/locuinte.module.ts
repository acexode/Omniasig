import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LocuintePageRoutingModule } from './locuinte-routing.module';

import { LocuintePage } from './locuinte.page';

import { SharedModule } from '../../../shared/shared.module';

import { LocuinteSharedModule } from './locuinte-shared.module';

import { LocuinteViewComponent } from './components/locuinte-view/locuinte-view.component';

import { LocuinteViewCardComponent } from './components/locuinte-view-card/locuinte-view-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocuintePageRoutingModule,
    SharedModule,
    LocuinteSharedModule,
  ],
  declarations: [
    LocuintePage,
    LocuinteViewComponent,
    LocuinteViewCardComponent,
  ],
})
export class LocuintePageModule {}
