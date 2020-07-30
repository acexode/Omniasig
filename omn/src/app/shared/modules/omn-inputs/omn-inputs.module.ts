import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';
import { RadiosComponent } from './components/radios/radios.component';

@NgModule({
  declarations: [SelectComponent, InputComponent, RadiosComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [SelectComponent, InputComponent, RadiosComponent],
})
export class OmnInputsModule {}
