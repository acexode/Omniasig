import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocuintePage } from './locuinte.page';
import { LocuinteViewComponent } from './components/locuinte-view/locuinte-view.component';

const routes: Routes = [
  {
    path: '',
    component: LocuintePage,
  },
  {
    path: 'view/:id',
    component: LocuinteViewComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LocuintePageRoutingModule {}
