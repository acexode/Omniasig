import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { SelectComponent } from './components/select/select.component';

@NgModule({
  declarations: [SelectComponent, InputComponent],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [SelectComponent, InputComponent],
})
export class OmnInputsModule {}
