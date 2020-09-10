import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OmnInputsModule } from 'src/app/shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { AutentificareComponent } from './components/autentificare/autentificare.component';
import { MarketingOptionsComponent } from './components/marketing-options/marketing-options.component';
import { SettingsService } from './services/settings.service';
import { SetariPageRoutingModule } from './setari-routing.module';
import { SetariPage } from './setari.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SetariPageRoutingModule,
    SharedModule,
    OmnInputsModule,
    ReactiveFormsModule,
  ],
  declarations: [SetariPage, AutentificareComponent, MarketingOptionsComponent],
  providers:[SettingsService]
})
export class SetariPageModule {}
