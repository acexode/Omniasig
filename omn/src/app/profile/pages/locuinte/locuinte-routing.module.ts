import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocuintePage } from './locuinte.page';

const routes: Routes = [
  {
    path: '',
    component: LocuintePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocuintePageRoutingModule {}
