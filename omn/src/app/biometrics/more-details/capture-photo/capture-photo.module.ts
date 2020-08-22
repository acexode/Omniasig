import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { OmnInputsModule } from '../../../shared/modules/omn-inputs/omn-inputs.module';
import { CompleteVerificationComponent } from './complete-verification/complete-verification.component';
import { CapturePhotoComponent } from './capture-photo.component'

import { CapturePhotoRoutingModule } from './capture-photo-routing.module';


@NgModule({
  declarations: [
    CapturePhotoComponent,
    CompleteVerificationComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ReactiveFormsModule,
    OmnInputsModule,
    FormsModule,
    SharedModule,
    CapturePhotoRoutingModule
  ]
})
export class CapturePhotoModule { }
