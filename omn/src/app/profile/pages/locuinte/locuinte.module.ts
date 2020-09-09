import { ConfirmationModalComponent } from './components/modals/confirmation-modal/confirmation-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { LocuinteFormPageComponent } from './components/locuinte-form-page/locuinte-form-page.component';
import { LocuinteViewCardComponent } from './components/locuinte-view-card/locuinte-view-card.component';
import { LocuinteViewComponent } from './components/locuinte-view/locuinte-view.component';
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
  declarations: [
    LocuintePage,
    LocuinteViewComponent,
    LocuinteViewCardComponent,
    LocuinteFormPageComponent,
    ConfirmationModalComponent,
  ],
})
export class LocuintePageModule {}
