import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { InfoCardComponent } from './components/info-card/info-card.component';
import { InfoDocComponent } from './components/info-doc/info-doc.component';
import { DisabledMessageModalComponent } from './components/modals/disabled-message-modal/disabled-message-modal.component';
import { TipModalComponent } from './components/modals/tip-modal/tip-modal.component';
import { PolicyArchiveListComponent } from './components/policy-archive-list/policy-archive-list.component';
import { PolicyCardListComponent } from './components/policy-card-list/policy-card-list.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicySharedModule } from './policy-shared.module';
import { CesiuneFormComponent} from './components/cesiune-form/cesiune-form.component'
import { PolicyVerifyComponent} from './pages/policy-verify/policy-verify.component'
import { AdresaLocuintaComponent } from './components/adresa-locuinta/adresa-locuinta.component';

@NgModule({
  declarations: [
    PolicyPage,
    PolicyComponent,
    PolicyCardListComponent,
    PolicyArchiveListComponent,
    InfoDocComponent,
    InfoCardComponent,
    CesiuneFormComponent,
    PolicyVerifyComponent,
    AdresaLocuintaComponent,
    DisabledMessageModalComponent,
    TipModalComponent,
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    PolicySharedModule,
    IonicModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
})
export class PolicyModule {}
