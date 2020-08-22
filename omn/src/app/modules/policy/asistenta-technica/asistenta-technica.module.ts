import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistentaTechnicaPageRoutingModule } from './asistenta-technica-routing.module';

import { AsistentaTechnicaPage } from './asistenta-technica.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistentaTechnicaPageRoutingModule
  ],
  declarations: [AsistentaTechnicaPage]
})
export class AsistentaTechnicaPageModule {}
