import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistentaTechnicaPageRoutingModule } from './asistenta-technica-routing.module';

import { AsistentaTechnicaPage } from './asistenta-technica.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    AsistentaTechnicaPageRoutingModule
  ],
  declarations: [AsistentaTechnicaPage]
})
export class AsistentaTechnicaPageModule {}
