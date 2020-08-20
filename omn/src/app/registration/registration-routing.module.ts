import { RegPasscodeComponent } from './reg-passcode/reg-passcode.component';
import { NotaDeInformareComponent } from './nota-de-informare/nota-de-informare.component';
import { RegInputSmsComponent } from './reg-input-sms/reg-input-sms.component';
import { RegNumarTelefonComponent } from './reg-numar-telefon/reg-numar-telefon.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    component:RegNumarTelefonComponent
  },
  {
    path:'confirm-number/:number',
    component:RegInputSmsComponent
  },
  {
    path:'notice',
    component:NotaDeInformareComponent
  },
  {
    path:'create-pin',
    component:RegPasscodeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule { }
