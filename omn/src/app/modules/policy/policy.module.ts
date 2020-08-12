import { TipModalComponent } from './components/modals/tip-modal/tip-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PolicyArchiveListComponent } from './components/policy-archive-list/policy-archive-list.component';
import { PolicyCardListComponent } from './components/policy-card-list/policy-card-list.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicySharedModule } from './policy-shared.module';
import { InfoDocComponent } from './components/info-doc/info-doc.component';
import { InfoCardComponent } from './components/info-card/info-card.component';

@NgModule({
  declarations: [
    PolicyPage,
    PolicyComponent,
    PolicyCardListComponent,
    PolicyArchiveListComponent,
    InfoDocComponent,
    InfoCardComponent,
    TipModalComponent
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    PolicySharedModule,
    IonicModule,
    RouterModule,
    SharedModule,
  ],
})
export class PolicyModule {}
