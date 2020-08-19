import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, RegistrationPageRoutingModule,OmnInputsModule, SharedModule,
    ReactiveFormsModule,
    OmnInputsModule,],
  declarations: [],
})
export class RegistrationPageModule {}
