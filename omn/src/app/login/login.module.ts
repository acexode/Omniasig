import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { OmnInputsModule } from './../shared/modules/omn-inputs/omn-inputs.module';
import { InputSmsComponent } from './input-sms/input-sms.component';
import { LoginPageRoutingModule } from './login-routing.module';
import { NumarTelefonComponent } from './numar-telefon/numar-telefon.component';
import { PasscodeComponent } from './passcode/passcode.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    OmnInputsModule,
    SharedModule,
    ReactiveFormsModule,
    OmnInputsModule,
  ],
  declarations: [NumarTelefonComponent, InputSmsComponent, PasscodeComponent],
})
export class LoginPageModule {}
