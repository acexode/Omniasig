import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InputComponent } from './components/input/input.component';
import { RadiosComponent } from './components/radios/radios.component';
import { SelectComponent } from './components/select/select.component';
import { CustomSelectDirective } from './directives/custom-select.directive';

@NgModule({
  declarations: [
    SelectComponent,
    InputComponent,
    RadiosComponent,
    CustomSelectDirective,
  ],
  imports: [CommonModule, IonicModule, ReactiveFormsModule],
  exports: [SelectComponent, InputComponent, RadiosComponent],
})
export class OmnInputsModule {}
