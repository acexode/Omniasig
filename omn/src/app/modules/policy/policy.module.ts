import { PaymentStatusComponent } from './components/payment-status/payment-status.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { OmnInputsModule } from './../../shared/modules/omn-inputs/omn-inputs.module';
import { AsistentaModalPagePage } from './components/asistenta-modal-page/asistenta-modal-page.page';
import { AsistentaTechnicaPage } from './components/asistenta-technica/asistenta-technica.page';
import { DisabledMessageModalComponent } from './components/modals/disabled-message-modal/disabled-message-modal.component';
import { OfferViewComponent } from './components/offer-view/offer-view.component';
import { PolicyArchiveListComponent } from './components/policy-archive-list/policy-archive-list.component';
import { PolicyCardListComponent } from './components/policy-card-list/policy-card-list.component';
import { PolicyViewComponent } from './components/policy-view/policy-view.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicySharedModule } from './policy-shared.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
@NgModule({
  declarations: [
    PolicyPage,
    PolicyComponent,
    PolicyCardListComponent,
    PolicyArchiveListComponent,
    DisabledMessageModalComponent,
    OfferViewComponent,
    PolicyViewComponent,
    AsistentaModalPagePage,
    AsistentaTechnicaPage,
    PaymentStatusComponent
  ],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    PolicySharedModule,
    IonicModule,
    RouterModule,
    SharedModule,
    OmnInputsModule,
    FormsModule,
    ReactiveFormsModule,
    OmnInputsModule,
  ],
  exports: [AsistentaModalPagePage],
  providers: [InAppBrowser],
})
export class PolicyModule { }
