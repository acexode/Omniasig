import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiometricsRoutingModule } from './biometrics-routing.module';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { BiometricsComponent } from './biometrics.component';
import { InfoComponent } from './info/info.component';
import { ConfirmareIdentitateComponent } from './confirmare-identitate/confirmare-identitate.component';

@NgModule({
  declarations: [
    BiometricsComponent,
    InfoComponent,
    ConfirmareIdentitateComponent
  ],
  imports: [
    CommonModule,
    BiometricsRoutingModule,
    OmnInputsModule,
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class BiometricsModule { }
