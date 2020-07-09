import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [TabMenuComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [TabMenuComponent],
})
export class SharedModule {}
