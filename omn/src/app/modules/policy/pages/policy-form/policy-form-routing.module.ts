import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyFormPage } from './policy-form.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyFormPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyFormPageRoutingModule {}
