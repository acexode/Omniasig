import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { DatePersonalePageRoutingModule } from './date-personale-routing.module';
import { DatePersonalePage } from './date-personale.page';
import { DatePersonaleFormComponent } from './components/date-personale-form/date-personale-form.component';
import { DatePersonaleValidateEmailComponent } from './components/date-personale-validate-email/date-personale-validate-email.component';
import { OmnAppLauncherModule } from 'src/app/shared/modules/omn-app-launcher/omn-app-launcher.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePersonalePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    OmnAppLauncherModule,
  ],
  declarations: [
    DatePersonalePage,
    DatePersonaleFormComponent,
    DatePersonaleValidateEmailComponent,
  ],
})
export class DatePersonalePageModule {}
