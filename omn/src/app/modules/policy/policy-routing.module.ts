import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferViewComponent } from './components/offer-view/offer-view.component';
import { PolicyViewComponent } from './components/policy-view/policy-view.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';

const routes: Routes = [
  {
    path: '',
    component: PolicyPage,
    children: [
      {
        path: '',
        component: PolicyComponent,
      },
      {
        path: 'form',
        loadChildren: () =>
          import('./pages/policy-form/policy-form.module').then(
            (m) => m.PolicyFormPageModule
          ),
      },
      {
        path: 'offer/:id',
        component: OfferViewComponent,
      },
      {
        path: ':id',
        component: PolicyViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
