import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsistentaTechnicaPage } from './asistenta-technica.page';

const routes: Routes = [
  {
    path: '',
    component: AsistentaTechnicaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsistentaTechnicaPageRoutingModule {}
