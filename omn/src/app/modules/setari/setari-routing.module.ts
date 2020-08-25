import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetariPage } from './setari.page';
import { AutentificareComponent } from './components/autentificare/autentificare.component';
import { MarketingOptionsComponent } from './components/marketing-options/marketing-options.component';
import { ChangeAccessCodeComponent } from './components/autentificare/change-access-code/change-access-code.component';
import { ChangePhoneNumberComponent } from './components/autentificare/change-phone-number/change-phone-number.component';

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
  {
    path: 'change-access-cod',
    component: ChangeAccessCodeComponent,
  },
  {
    path: 'change-numar-telefon',
    component: ChangePhoneNumberComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetariPageRoutingModule {}
