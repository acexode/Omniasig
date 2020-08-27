import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdresaLocuintaComponent } from './components/adresa-locuinta/adresa-locuinta.component';
import { CesiuneFormComponent } from './components/cesiune-form/cesiune-form.component';
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
        path: 'policy-verify',
        // loadChildren: () =>
        //   import('./pages/policy-verify/policy-verify.module').then(
        //     (m) => m.PolicyVerifyModule
        //   ),
      },
      {
        path: 'cesiune-form',
        component: CesiuneFormComponent,
      },
      {
        path: 'offer/:id',
        component: OfferViewComponent,
      },
      {
        path: 'adresa-locuinta',
        component: AdresaLocuintaComponent,
      },

      {
        path: ':id',
        component: PolicyViewComponent,
      },
    ],
  },
  {
    path: 'asistenta-technica',
    loadChildren: () => import('./asistenta-technica/asistenta-technica.module').then( m => m.AsistentaTechnicaPageModule)
  },
  {
    path: 'asistenta-modal-page',
    loadChildren: () => import('./asistenta-modal-page/asistenta-modal-page.module').then( m => m.AsistentaModalPagePageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyRoutingModule {}
