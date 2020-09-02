import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyFormSteps } from 'src/app/shared/models/modes/policy-form-steps';
import { PolicyFormPage } from './policy-form.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyFormPage,
    data: {
      step: PolicyFormSteps.DNT,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyFormPageRoutingModule {}
