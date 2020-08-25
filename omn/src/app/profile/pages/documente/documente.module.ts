import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocumentePageRoutingModule } from './documente-routing.module';

import { DocumentePage } from './documente.page';
import { ExpandableComponent } from '../../components/expandable/expandable.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    DocumentePageRoutingModule
  ],
  declarations: [DocumentePage, ExpandableComponent]
})
export class DocumentePageModule {}
