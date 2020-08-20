import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BiometricsRoutingModule } from './biometrics-routing.module';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [],
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
