import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { policyTypes } from 'src/app/shared/models/data/policy-types';
import { PolicyFormSteps } from 'src/app/shared/models/modes/policy-form-steps';
import { InsurancePeriodComponent } from './insurance-period/insurance-period.component';
import { PolicyFormPage } from './policy-form.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyFormPage,
    data: {
      step: PolicyFormSteps.DNT,
      policyType: policyTypes.PAD,
    },
  },
  {
    path: 'insurance-period',
    component: InsurancePeriodComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyFormPageRoutingModule {}
