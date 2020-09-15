import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from '../shared/shared.module';
import { BiometricsRoutingModule } from './biometrics-routing.module';
import { BiometricsComponent } from './biometrics.component';
import { ConfirmareIdentitateComponent } from './confirmare-identitate/confirmare-identitate.component';
import { InfoComponent } from './info/info.component';

@NgModule({
  declarations: [
    BiometricsComponent,
    InfoComponent,
    ConfirmareIdentitateComponent,
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
  ],
})
export class BiometricsModule {}
