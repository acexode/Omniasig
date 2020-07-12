import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { ImageCardComponent } from './components/image-card/image-card.component';

@NgModule({
  declarations: [TabMenuComponent, ImageCardComponent],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [TabMenuComponent, ImageCardComponent],
})
export class SharedModule {}
