import { TipModalComponent } from './../../components/modals/tip-modal/tip-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExclusionSlidesComponent } from '../../components/exclusion-slides/exclusion-slides.component';
import { InfoDocComponent } from '../../components/info-doc/info-doc.component';
import { PolicySharedModule } from '../../policy-shared.module';
import { PolicyFormPageRoutingModule } from './policy-form-routing.module';
import { PolicyFormPage } from './policy-form.page';
import { DntModule } from 'src/app/shared/modules/dnt/dnt.module';
import {InsurancePeriodComponent} from '../policy-form/insurance-period/insurance-period.component'
import { OmnInputsModule } from '../../../../shared/modules/omn-inputs/omn-inputs.module'
import { InfoCardComponent } from '../../components/info-card/info-card.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicySharedModule,
    SharedModule,
    PolicyFormPageRoutingModule,
    DntModule,
    OmnInputsModule
  ],
  declarations: [PolicyFormPage, InsurancePeriodComponent,
    ExclusionSlidesComponent,
    InfoDocComponent,
    TipModalComponent,
    InfoCardComponent,
  ],
})
export class PolicyFormPageModule {}
