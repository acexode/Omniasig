import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SetariPageRoutingModule } from './setari-routing.module';

import { SetariPage } from './setari.page';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutentificareComponent } from './components/autentificare/autentificare.component';
import { MarketingOptionsComponent } from './components/marketing-options/marketing-options.component';
import { OmnInputsModule } from 'src/app/shared/modules/omn-inputs/omn-inputs.module';
import { ChangeAccessCodeComponent } from './components/autentificare/change-access-code/change-access-code.component';
import { ChangePhoneNumberComponent } from './components/autentificare/change-phone-number/change-phone-number.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetariPageRoutingModule,
    SharedModule,
    OmnInputsModule,
  ],
  declarations: [
    SetariPage,
    AutentificareComponent,
    MarketingOptionsComponent,
    ChangeAccessCodeComponent,
    ChangePhoneNumberComponent,
  ],
})
export class SetariPageModule {}
