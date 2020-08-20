import { AdresaDeEmailComponent } from './adresa-de-email/adresa-de-email.component';
import { ContCreatComponent } from './cont-creat/cont-creat.component';
import { DatePersonaleComponent } from './date-personale/date-personale.component';
import { ConfirmCodDeAccesComponent } from './confirm-cod-de-acces/confirm-cod-de-acces.component';
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
    path:'create-passcode',
    component:RegPasscodeComponent
  },
  {
    path:'confirm-passcode/:passcode',
    component:ConfirmCodDeAccesComponent
  },
  {
    path:'personal-details',
    component:DatePersonaleComponent
  },
  {
    path:'email',
    component:AdresaDeEmailComponent
  },
  {
    path:'account-created',
    component:ContCreatComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule { }
