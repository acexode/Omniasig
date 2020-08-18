import { PolicyViewComponent } from '../components/policy-view/policy-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from '../components/policy/policy.component';
import { PolicyPage } from './policy.page';
import { InfoDocComponent } from '../components/info-doc/info-doc.component';
import { CesiuneFormComponent} from '../components/cesiune-form/cesiune-form.component'
import { OfferViewComponent } from '../components/offer-view/offer-view.component';
import { AdresaLocuintaComponent } from '../components/adresa-locuinta/adresa-locuinta.component';

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
        path: ':id',
        component: PolicyViewComponent,
      },
      {
        path: 'cesiune-form',
        component: CesiuneFormComponent
      },
      {
        path: 'offer/:id',
        component: OfferViewComponent,
      },
      {
        path: 'adresa-locuinta',
        component: AdresaLocuintaComponent,
      }
    ],
  },
  {
    path: 'form',
    loadChildren: () =>
      import('../pages/policy-form/policy-form.module').then(
        (m) => m.PolicyFormPageModule
      ),
  },
  {
    path: 'policy-verify',
    loadChildren: () =>
      import('../pages/policy-verify/policy-verify.module').then(
        (m) => m.PolicyVerifyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
