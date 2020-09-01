import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeSuccessfulComponent } from './change-successful/change-successful.component';
import { CodAccesNouComponent } from './cod-acces-nou/cod-acces-nou.component';
import { CodActualComponent } from './cod-actual/cod-actual.component';
import { ConfirmareCodAccesComponent } from './confirmare-cod-acces/confirmare-cod-acces.component';

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
