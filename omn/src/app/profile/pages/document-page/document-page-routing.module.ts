import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentPagePage } from './document-page.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentPagePageRoutingModule {}
