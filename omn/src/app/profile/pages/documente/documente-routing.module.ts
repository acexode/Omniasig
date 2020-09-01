import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentePage } from './documente.page';

const routes: Routes = [
  {
    path: '',
    component: DocumentePage,
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../document-page/document-page.module').then(
        (m) => m.DocumentPagePageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentePageRoutingModule {}
