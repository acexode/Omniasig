import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { DntComponent } from './components/dnt/dnt.component';

@NgModule({
  declarations: [DntComponent],
  imports: [CommonModule, IonicModule],
  exports: [DntComponent],
})
export class DntModule {}
