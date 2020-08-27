import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfferViewComponent } from '../components/offer-view/offer-view.component';
import { PolicyViewComponent } from '../components/policy-view/policy-view.component';
import { PolicyComponent } from '../components/policy/policy.component';
import { PolicyPage } from './policy.page';

const routes: Routes = [
  {
    path: 'form',
    pathMatch: 'full',
    loadChildren: () =>
      import('../pages/policy-form/policy-form.module').then(
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
