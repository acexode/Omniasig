import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from '../shared/shared.module';
import { ChangeSuccessfulComponent } from './change-successful/change-successful.component';
import { CodAccesNouComponent } from './cod-acces-nou/cod-acces-nou.component';
import { CodActualComponent } from './cod-actual/cod-actual.component';
import { ConfirmareCodAccesComponent } from './confirmare-cod-acces/confirmare-cod-acces.component';
import { SchimbareCodAccesPageRoutingModule } from './schimbare-cod-acces-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchimbareCodAccesPageRoutingModule,
    OmnInputsModule,
    SharedModule,
    ReactiveFormsModule,
    OmnInputsModule,
  ],
  declarations: [
    CodActualComponent,
    CodAccesNouComponent,
    ConfirmareCodAccesComponent,
    ChangeSuccessfulComponent,
  ],
})
export class SchimbareCodAccesPageModule {}
