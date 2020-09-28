import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsuranceConditionsComponent } from './components/insurance-conditions/insurance-conditions.component';
import { OfferViewComponent } from './components/offer-view/offer-view.component';
import { PolicyViewComponent } from './components/policy-view/policy-view.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';

const routes: Routes = [
  {
    path: 'form',
    loadChildren: () =>
      import('./pages/policy-form/policy-form.module').then(
        (m) => m.PolicyFormPageModule
      ),
  },

  {
    path: '',
    component: PolicyPage,
    children: [
      {
        path: '',
        component: PolicyComponent,
      },
      {
        path: 'offer/:id',
        component: OfferViewComponent,
      },
      {
        path: 'conditions',
        component: InsuranceConditionsComponent,
      },
      {
        path: ':id',
        component: PolicyViewComponent,
      },
      // {
      //   path: 'payment-status',
      //   component: PaymentStatusComponent,
      // },
    ],
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
