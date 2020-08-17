import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PolicyVerifyComponent } from './policy-verify.component';

const routes: Routes = [
  {
    path: '',
    component: PolicyVerifyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PolicyVerifyRoutingModule {}
