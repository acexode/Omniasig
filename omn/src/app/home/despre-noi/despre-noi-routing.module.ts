import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DespreNoiPage } from './despre-noi.page';

const routes: Routes = [
  {
    path: '',
    component: DespreNoiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DespreNoiPageRoutingModule {}
