import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DisabledPlaceholderComponent } from './components/disabled-placeholder/disabled-placeholder.component';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { PolicyListComponent } from './components/policy-list/policy-list.component';
import { SubPageHeaderComponent } from './components/sub-page-header/sub-page-header.component';
import { TabMenuComponent } from './components/tab-menu/tab-menu.component';
import { TimePipe } from './pipes/time.pipe';

@NgModule({
  declarations: [
    TabMenuComponent,
    ImageCardComponent,
    DisabledPlaceholderComponent,
    PolicyListComponent,
    SubPageHeaderComponent,
    TimePipe,
  ],
  imports: [CommonModule, FormsModule, IonicModule, RouterModule],
  exports: [
    TabMenuComponent,
    ImageCardComponent,
    DisabledPlaceholderComponent,
    PolicyListComponent,
    TabMenuComponent,
    SubPageHeaderComponent,
    TimePipe,
  ],
})
export class SharedModule {}
