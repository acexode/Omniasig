import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
