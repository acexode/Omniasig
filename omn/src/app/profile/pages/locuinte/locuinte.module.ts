import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { LocuinteFormPageComponent } from './components/locuinte-form-page/locuinte-form-page.component';
import { LocuintePageRoutingModule } from './locuinte-routing.module';
import { LocuinteSharedModule } from './locuinte-shared.module';
import { LocuintePage } from './locuinte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LocuintePageRoutingModule,
    SharedModule,
    LocuinteSharedModule,
    RouterModule,
  ],
  declarations: [LocuintePage, LocuinteFormPageComponent],
})
export class LocuintePageModule {}
