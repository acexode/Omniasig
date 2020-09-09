import { ResetPincodeService } from './services/reset-pincode.service';
import { PinChangeSuccessfulComponent } from './pin-change-successful/pin-change-successful.component';
import { ConfirmPinComponent } from './confirm-pin/confirm-pin.component';
import { NewPinComponent } from './new-pin/new-pin.component';
import { RecuperarePasscodeCodComponent } from './recuperare-passcode-cod/recuperare-passcode-cod.component';
import { CnpDigitsComponent } from './cnp-digits/cnp-digits.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PinCodeResetPageRoutingModule } from './pin-code-reset-routing.module';
import { SharedModule } from '../shared/shared.module';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, SharedModule,
    ReactiveFormsModule, PinCodeResetPageRoutingModule, OmnInputsModule
  ],
  declarations: [
    CnpDigitsComponent,
    RecuperarePasscodeCodComponent,
    NewPinComponent,
    ConfirmPinComponent,
    PinChangeSuccessfulComponent,
  ],
  providers: [ResetPincodeService]
})
export class PinCodeResetPageModule { }
