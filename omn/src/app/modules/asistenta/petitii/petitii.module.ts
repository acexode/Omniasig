import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PetitiiPageRoutingModule } from './petitii-routing.module';
import { PetitiiPage } from './petitii.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetitiiPageRoutingModule,
    SharedModule
  ],
  declarations: [PetitiiPage]
})
export class PetitiiPageModule {}
