import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';

@NgModule({
  declarations: [TabMenuComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [TabMenuComponent],
})
export class SharedModule {}
