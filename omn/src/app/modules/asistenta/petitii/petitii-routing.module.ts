import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PetitiiPage } from './petitii.page';

const routes: Routes = [
  {
    path: '',
    component: PetitiiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PetitiiPageRoutingModule {}
