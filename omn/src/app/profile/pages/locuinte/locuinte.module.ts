import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
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
  ],
  declarations: [LocuintePage, LocuinteFormPageComponent],
})
export class LocuintePageModule {}
