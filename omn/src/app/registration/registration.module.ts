import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from '../shared/shared.module';
import { AdresaDeEmailComponent } from './adresa-de-email/adresa-de-email.component';
import { ConfirmCodDeAccesComponent } from './confirm-cod-de-acces/confirm-cod-de-acces.component';
import { ContCreatComponent } from './cont-creat/cont-creat.component';
import { DatePersonaleComponent } from './date-personale/date-personale.component';
import { NotaDeInformareComponent } from './nota-de-informare/nota-de-informare.component';
import { RegInputSmsComponent } from './reg-input-sms/reg-input-sms.component';
import { RegNumarTelefonComponent } from './reg-numar-telefon/reg-numar-telefon.component';
import { RegPasscodeComponent } from './reg-passcode/reg-passcode.component';
import { RegistrationPageRoutingModule } from './registration-routing.module';
import { TermeniSiConditiiComponent } from './termeni-si-conditii/termeni-si-conditii.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RegistrationPageRoutingModule,
    OmnInputsModule,
    SharedModule,
    ReactiveFormsModule,
    OmnInputsModule,
  ],
  declarations: [
    RegPasscodeComponent,
    RegNumarTelefonComponent,
    RegInputSmsComponent,
    NotaDeInformareComponent,
    DatePersonaleComponent,
    ContCreatComponent,
    ConfirmCodDeAccesComponent,
    AdresaDeEmailComponent,
    TermeniSiConditiiComponent,
  ],
})
export class RegistrationPageModule {}
