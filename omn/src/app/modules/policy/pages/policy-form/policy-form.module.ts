import { TipModalComponent } from './../../components/modals/tip-modal/tip-modal.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { DntModule } from 'src/app/shared/modules/dnt/dnt.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExclusionSlidesComponent } from '../../components/exclusion-slides/exclusion-slides.component';
import { InfoDocComponent } from '../../components/info-doc/info-doc.component';
import { PolicySharedModule } from '../../policy-shared.module';
import { PolicyFormPageRoutingModule } from './policy-form-routing.module';
import { PolicyFormPage } from './policy-form.page';
import { InfoCardComponent } from '../../components/info-card/info-card.component';
import { AdresaLocuintaComponent } from '../../components/adresa-locuinta/adresa-locuinta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PolicySharedModule,
    SharedModule,
    PolicyFormPageRoutingModule,
    DntModule,
  ],
  declarations: [
    PolicyFormPage,
    ExclusionSlidesComponent,
    InfoDocComponent,
    TipModalComponent,
    InfoCardComponent,
    AdresaLocuintaComponent
  ],
})
export class PolicyFormPageModule {}
