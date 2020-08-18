import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DatePersonaleUserActivationPage } from './date-personale-user-activation.page';

const routes: Routes = [
  {
    path: '',
    component: DatePersonaleUserActivationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatePersonaleUserActivationPageRoutingModule {}
