import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../../shared/shared.module';
import { DatePersonalePageRoutingModule } from './date-personale-routing.module';
import { DatePersonalePage } from './date-personale.page';
import { DatePersonaleFormComponent } from './components/date-personale-form/date-personale-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DatePersonalePageRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [DatePersonalePage, DatePersonaleFormComponent],
})
export class DatePersonalePageModule {}
