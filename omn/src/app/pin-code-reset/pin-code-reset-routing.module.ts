import { PinChangeSuccessfulComponent } from './pin-change-successful/pin-change-successful.component';
import { ConfirmPinComponent } from './confirm-pin/confirm-pin.component';
import { NewPinComponent } from './new-pin/new-pin.component';
import { RecuperarePasscodeCodComponent } from './recuperare-passcode-cod/recuperare-passcode-cod.component';
import { CnpDigitsComponent } from './cnp-digits/cnp-digits.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CnpDigitsComponent,
  },
  {
    path: 'verify-passcode',
    component: RecuperarePasscodeCodComponent,
  },
  {
    path: 'new-pin',
    component: NewPinComponent,
  },
  {
    path: 'confirm-pin',
    component: ConfirmPinComponent,
  },
  {
    path: 'reset-successful',
    component: PinChangeSuccessfulComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PinCodeResetPageRoutingModule {}
