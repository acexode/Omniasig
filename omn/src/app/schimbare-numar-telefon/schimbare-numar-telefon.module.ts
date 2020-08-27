import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from '../shared/shared.module';
import { ChangePhoneNumberComponent } from './change-phone-number/change-phone-number.component';
import { ChangeSuccessfulComponent } from './change-successful/change-successful.component';
import { SchimbareNumarTelefonPageRoutingModule } from './schimbare-numar-telefon-routing.module';
import { VerifyPhoneNumberComponent } from './verify-phone-number/verify-phone-number.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchimbareNumarTelefonPageRoutingModule,
    OmnInputsModule,
    SharedModule,
    ReactiveFormsModule,
    OmnInputsModule,
  ],
  declarations: [
    ChangePhoneNumberComponent,
    ChangeSuccessfulComponent,
    VerifyPhoneNumberComponent,
  ],
})
export class SchimbareNumarTelefonPageModule {}
