import { LoginGuard } from './../core/guards/login/login.guard';
import { AuthGuard } from './../core/guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdresaDeEmailComponent } from './adresa-de-email/adresa-de-email.component';
import { ConfirmCodDeAccesComponent } from './confirm-cod-de-acces/confirm-cod-de-acces.component';
import { ContCreatComponent } from './cont-creat/cont-creat.component';
import { DatePersonaleComponent } from './date-personale/date-personale.component';
import { NotaDeInformareComponent } from './nota-de-informare/nota-de-informare.component';
import { RegInputSmsComponent } from './reg-input-sms/reg-input-sms.component';
import { RegNumarTelefonComponent } from './reg-numar-telefon/reg-numar-telefon.component';
import { RegPasscodeComponent } from './reg-passcode/reg-passcode.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [LoginGuard],
    component: RegNumarTelefonComponent,
  },
  {
    path: 'confirm-number',
    canActivate: [LoginGuard],
    component: RegInputSmsComponent,
  },
  {
    path: 'notice',
    canActivate: [LoginGuard],
    component: NotaDeInformareComponent,
  },
  {
    path: 'create-passcode',
    canActivate: [LoginGuard],
    component: RegPasscodeComponent,
  },
  {
    path: 'confirm-passcode',
    canActivate: [LoginGuard],
    component: ConfirmCodDeAccesComponent,
  },
  {
    path: 'personal-details',
    canActivate: [LoginGuard],
    component: DatePersonaleComponent,
  },
  {
    path: 'email',
    canActivate: [LoginGuard],
    component: AdresaDeEmailComponent,
  },
  {
    path: 'account-created',
    canActivate: [AuthGuard],
    component: ContCreatComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPageRoutingModule {}
