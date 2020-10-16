import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedFileModule } from 'src/app/shared/modules/shared-file/shared-file.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ExpandableComponent } from '../../components/expandable/expandable.component';
import { DocumentePageRoutingModule } from './documente-routing.module';
import { DocumentePage } from './documente.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    DocumentePageRoutingModule,
    SharedFileModule,
  ],
  declarations: [DocumentePage, ExpandableComponent],
})
export class DocumentePageModule {}
