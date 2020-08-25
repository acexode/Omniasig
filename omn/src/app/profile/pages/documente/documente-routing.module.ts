import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocumentePage } from './documente.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentePageRoutingModule {}
