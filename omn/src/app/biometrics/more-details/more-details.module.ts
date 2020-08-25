import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { OmnInputsModule } from '../../shared/modules/omn-inputs/omn-inputs.module';
import { MoreDetailsRoutingModule } from './more-details-routing.module';
import { MoreDetailsComponent } from './more-details.component';
import { CaptureDocsComponent } from './capture-docs/capture-docs.component'
import { CapturePhotoComponent} from './capture-photo/capture-photo.component'

@NgModule({
  declarations: [
    MoreDetailsComponent,
    CaptureDocsComponent,
    CapturePhotoComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MoreDetailsRoutingModule,
    OmnInputsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

  ]
})
export class MoreDetailsModule { }
