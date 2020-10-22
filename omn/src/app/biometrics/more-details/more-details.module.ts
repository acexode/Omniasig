import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { OmnInputsModule } from '../../shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from '../../shared/shared.module';
import { CaptureDocsComponent } from './capture-docs/capture-docs.component';
import { CapturePhotoComponent } from './capture-photo/capture-photo.component';
import { CompleteVerificationComponent } from './complete-verification/complete-verification.component';
import { MoreDetailsRoutingModule } from './more-details-routing.module';
import { MoreDetailsComponent } from './more-details.component';

@NgModule({
  declarations: [
    MoreDetailsComponent,
    CaptureDocsComponent,
    CapturePhotoComponent,
    CompleteVerificationComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    MoreDetailsRoutingModule,
    OmnInputsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    AndroidPermissions
  ],
})
export class MoreDetailsModule {}
