import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CodActualComponent } from './cod-actual/cod-actual.component';
import { CodAccesNouComponent } from './cod-acces-nou/cod-acces-nou.component';
import { ConfirmareCodAccesComponent } from './confirmare-cod-acces/confirmare-cod-acces.component';
import { ChangeSuccessfulComponent } from '../schimbare-numar-telefon/change-successful/change-successful.component';

const routes: Routes = [
  {
    path: '',
    component: CodActualComponent,
  },
  {
    path: 'nou',
    component: CodAccesNouComponent,
  },
  {
    path: 'confirmare/:code',
    component: ConfirmareCodAccesComponent,
  },
  {
    path: 'change-success',
    component: ChangeSuccessfulComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SchimbareCodAccesPageRoutingModule {}
