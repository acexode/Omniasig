import { PolicyValoareModalComponent } from './../../components/modals/policy-valoare-modal/policy-valoare-modal.component';
import { PolicyVerifyComponent } from './../../components/policy-verify/policy-verify.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DntModule } from 'src/app/shared/modules/dnt/dnt.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OmnInputsModule } from '../../../../shared/modules/omn-inputs/omn-inputs.module';
import { AdresaLocuintaComponent } from '../../components/adresa-locuinta/adresa-locuinta.component';
import { ExclusionSlidesComponent } from '../../components/exclusion-slides/exclusion-slides.component';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { InfoDocComponent } from '../../components/info-doc/info-doc.component';
import { AsistentaTechnicaPage } from '../../components/asistenta-technica/asistenta-technica.page';
import { WayToPayComponent } from '../../components/way-to-pay/way-to-pay.component';
import { InsurancePeriodComponent } from '../../components/insurance-period/insurance-period.component';
import { PolicySharedModule } from '../../policy-shared.module';
import { LocuinteSharedModule } from './../../../../profile/pages/locuinte/locuinte-shared.module';
import { CesiuneFormComponent } from './../../components/cesiune-form/cesiune-form.component';
import { TipModalComponent } from './../../components/modals/tip-modal/tip-modal.component';
import { PolicyAddressFormComponent } from './../../components/policy-address-form/policy-address-form.component';
import { PolicyFormPageRoutingModule } from './policy-form-routing.module';
import { PolicyFormPage } from './policy-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicySharedModule,
    SharedModule,
    PolicyFormPageRoutingModule,
    DntModule,
    OmnInputsModule,
    ReactiveFormsModule,
    LocuinteSharedModule,
  ],
  declarations: [
    PolicyFormPage,
    InsurancePeriodComponent,
    ExclusionSlidesComponent,
    InfoDocComponent,
    TipModalComponent,
    InfoCardComponent,
    AdresaLocuintaComponent,
    PolicyAddressFormComponent,
    CesiuneFormComponent,
    PolicyVerifyComponent,
    PolicyValoareModalComponent,
    AsistentaTechnicaPage,
    WayToPayComponent,
  ],
})
export class PolicyFormPageModule {}
