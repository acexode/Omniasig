import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';
import { InfoDocComponent } from './components/info-doc/info-doc.component';
import { OfferViewComponent } from './components/offer-view/offer-view.component';

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
        path: 'info-doc',
        component: InfoDocComponent,
      },
      {
        path: 'offer/:id',
        component: OfferViewComponent,
      },
    ],
  },
  {
    path: 'form',
    loadChildren: () =>
      import('./pages/policy-form/policy-form.module').then(
        (m) => m.PolicyFormPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
