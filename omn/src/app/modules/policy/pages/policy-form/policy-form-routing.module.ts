import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyFormPage } from './policy-form.page';
import { InsurancePeriodComponent} from './insurance-period/insurance-period.component'

const routes: Routes = [
  {
    path: '',
    component: PolicyFormPage,
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
