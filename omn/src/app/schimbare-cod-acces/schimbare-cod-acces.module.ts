import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { OmnInputsModule } from '../shared/modules/omn-inputs/omn-inputs.module';
import { SharedModule } from '../shared/shared.module';
import { SchimbareCodAccesPageRoutingModule } from './schimbare-cod-acces-routing.module';
import { CodActualComponent } from './cod-actual/cod-actual.component';
import { CodAccesNouComponent } from './cod-acces-nou/cod-acces-nou.component';
import { ConfirmareCodAccesComponent } from './confirmare-cod-acces/confirmare-cod-acces.component';
import { ChangeSuccessfulComponent } from '../schimbare-numar-telefon/change-successful/change-successful.component';

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
