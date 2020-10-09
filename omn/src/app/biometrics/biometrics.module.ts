import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Camera } from '@ionic-native/camera/ngx';
import { IonicModule } from '@ionic/angular';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from '../shared/shared.module';
import { BiometricsRoutingModule } from './biometrics-routing.module';
import { BiometricsComponent } from './biometrics.component';
import { ConfirmareIdentitateComponent } from './confirmare-identitate/confirmare-identitate.component';
import { InfoComponent } from './info/info.component';
import { PhotoService } from './services/photo.service';

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
  providers: [Camera, PhotoService]
})
export class BiometricsModule { }
