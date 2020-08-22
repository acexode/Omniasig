import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsistentaModalPagePageRoutingModule } from './asistenta-modal-page-routing.module';

import { AsistentaModalPagePage } from './asistenta-modal-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsistentaModalPagePageRoutingModule
  ],
  declarations: [AsistentaModalPagePage]
})
export class AsistentaModalPagePageModule {}
