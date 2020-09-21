import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SugestiiPage } from './sugestii.page';

const routes: Routes = [
  {
    path: '',
    component: SugestiiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SugestiiPageRoutingModule {}
