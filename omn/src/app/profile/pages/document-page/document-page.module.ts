import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { DocumentPagePageRoutingModule } from './document-page-routing.module';
import { DocumentPagePage } from './document-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    IonicModule,
    DocumentPagePageRoutingModule,
  ],
  declarations: [DocumentPagePage],
})
export class DocumentPagePageModule {}
