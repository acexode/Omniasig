import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferViewComponent } from './components/offer-view/offer-view.component';
import { PolicyViewComponent } from './components/policy-view/policy-view.component';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';
import { Z_FULL_FLUSH } from 'zlib';

const routes: Routes = [
  {
    path: 'form',
    pathMatch:'full',
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
        path: ':id',
        component: PolicyViewComponent,
      },
      {
        path: 'offer/:id',
        component: OfferViewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
