import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistentaModalPagePage } from './asistenta-modal-page.page';

const routes: Routes = [
  {
    path: '',
    component: AsistentaModalPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistentaModalPagePageRoutingModule {}
