import { PolicyViewComponent } from '../components/policy-view/policy-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD:omn/src/app/modules/policy/page/policy-routing.module.ts
import { PolicyComponent } from '../components/policy/policy.component';
import { PolicyPage } from './policy.page';
import { InfoDocComponent } from '../components/info-doc/info-doc.component';
import { CesiuneFormComponent} from '../components/cesiune-form/cesiune-form.component'
import { OfferViewComponent } from '../components/offer-view/offer-view.component';
import { AdresaLocuintaComponent } from '../components/adresa-locuinta/adresa-locuinta.component';
=======
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';

import { InfoDocComponent } from './components/info-doc/info-doc.component';
import { OfferViewComponent } from './components/offer-view/offer-view.component';
import { AdresaLocuintaComponent } from './components/adresa-locuinta/adresa-locuinta.component';
>>>>>>> 5a9f4cdfd6080e5ffa71c206864d4bbc9babe57c:omn/src/app/modules/policy/policy-routing.module.ts

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
      },
    ],
  },
  {
<<<<<<< HEAD:omn/src/app/modules/policy/page/policy-routing.module.ts
    path: 'form',
    loadChildren: () =>
      import('../pages/policy-form/policy-form.module').then(
        (m) => m.PolicyFormPageModule
      ),
  },
  {
=======
>>>>>>> 5a9f4cdfd6080e5ffa71c206864d4bbc9babe57c:omn/src/app/modules/policy/policy-routing.module.ts
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
