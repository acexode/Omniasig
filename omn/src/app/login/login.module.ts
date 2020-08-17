import { OmnInputsModule } from './../shared/modules/omn-inputs/omn-inputs.module';
import { NumarTelefonComponent } from './numar-telefon/numar-telefon.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LoginPageRoutingModule } from './login-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, LoginPageRoutingModule,OmnInputsModule, SharedModule,
    ReactiveFormsModule,
    OmnInputsModule,],
  declarations: [NumarTelefonComponent],
})
export class LoginPageModule {}
