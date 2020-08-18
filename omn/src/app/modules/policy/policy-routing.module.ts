import { PolicyViewComponent } from './components/policy-view/policy-view.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyComponent } from './components/policy/policy.component';
import { PolicyPage } from './page/policy.page';
import { InfoDocComponent } from './components/info-doc/info-doc.component';
import { CesiuneFormComponent} from './components/cesiune-form/cesiune-form.component'
import { OfferViewComponent } from './components/offer-view/offer-view.component';
import { AdresaLocuintaComponent } from './components/adresa-locuinta/adresa-locuinta.component';

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
<<<<<<< HEAD
        path: 'cesiune-form',
        component: CesiuneFormComponent
=======
        path: 'offer/:id',
        component: OfferViewComponent,
>>>>>>> 1fc6fad8a5e3e8b5239517cffa2831b7a8516730
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
      import('./pages/policy-form/policy-form.module').then(
        (m) => m.PolicyFormPageModule
      ),
  },
  {
    path: 'policy-verify',
    loadChildren: () =>
      import('./pages/policy-verify/policy-verify.module').then(
        (m) => m.PolicyVerifyModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
