import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DntComponent } from './components/dnt/dnt.component';
import { DntService } from './services/dnt.service';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [DntComponent],
  imports: [CommonModule, IonicModule],
  providers: [DntService],
  exports: [DntComponent],
})
export class DntModule {}
