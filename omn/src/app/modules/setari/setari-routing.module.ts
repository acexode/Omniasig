import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetariPage } from './setari.page';
import { AutentificareComponent } from './components/autentificare/autentificare.component';
import { MarketingOptionsComponent } from './components/marketing-options/marketing-options.component';

const routes: Routes = [
  {
    path: '',
    component: SetariPage,
  },
  {
    path: 'autentificare',
    component: AutentificareComponent,
  },
  {
    path: 'optiuni-marketing',
    component: MarketingOptionsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetariPageRoutingModule {}
