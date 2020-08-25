import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DespreNoiPageRoutingModule } from './despre-noi-routing.module';

import { DespreNoiPage } from './despre-noi.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DespreNoiPageRoutingModule,
    SharedModule,
  ],
  declarations: [DespreNoiPage]
})
export class DespreNoiPageModule {}
