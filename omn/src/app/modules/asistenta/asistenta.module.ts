import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistentaPageRoutingModule } from './asistenta-routing.module';

import { AsistentaPage } from './asistenta.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistentaPageRoutingModule,
    SharedModule
  ],
  declarations: [AsistentaPage]
})
export class AsistentaPageModule {}
