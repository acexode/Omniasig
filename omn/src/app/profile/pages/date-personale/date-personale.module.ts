import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { IonicModule } from '@ionic/angular';
import { OmnAppLauncherModule } from 'src/app/shared/modules/omn-app-launcher/omn-app-launcher.module';
import { SharedFileModule } from 'src/app/shared/modules/shared-file/shared-file.module';
import { SharedModule } from '../../../shared/shared.module';
import { DatePersonaleFormComponent } from './components/date-personale-form/date-personale-form.component';
import { DatePersonaleValidateEmailComponent } from './components/date-personale-validate-email/date-personale-validate-email.component';
import { DatePersonalePageRoutingModule } from './date-personale-routing.module';
import { DatePersonalePage } from './date-personale.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePersonalePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    OmnAppLauncherModule,
    SharedFileModule
  ],
  declarations: [
    DatePersonalePage,
    DatePersonaleFormComponent,
    DatePersonaleValidateEmailComponent,
  ],
  providers: [EmailComposer]
})
export class DatePersonalePageModule {}
