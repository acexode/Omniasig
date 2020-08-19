import { PasscodeComponent } from './passcode/passcode.component';
import { InputSmsComponent } from './input-sms/input-sms.component';
import { NumarTelefonComponent } from './numar-telefon/numar-telefon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "",
    component: NumarTelefonComponent,
  },
  {
    path: "authenticate/:number",
    component: InputSmsComponent,
  },
    {
    path: "verfiy",
    component: PasscodeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginPageRoutingModule { }
