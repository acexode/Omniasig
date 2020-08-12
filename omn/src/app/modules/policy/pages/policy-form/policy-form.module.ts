import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PolicySharedModule } from '../../policy-shared.module';
import { PolicyFormPageRoutingModule } from './policy-form-routing.module';
import { PolicyFormPage } from './policy-form.page';
import { DntModule } from 'src/app/shared/modules/dnt/dnt.module';
import { ExclusionSlidesComponent } from '../../components/exclusion-slides/exclusion-slides.component';

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
  declarations: [PolicyFormPage, ExclusionSlidesComponent],
})
export class PolicyFormPageModule {}
