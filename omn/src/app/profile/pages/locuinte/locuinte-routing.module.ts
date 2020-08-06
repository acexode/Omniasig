import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocuinteFormModes } from 'src/app/shared/models/modes/locuinte-form-modes';
import { LocuinteFormPageComponent } from './components/locuinte-form-page/locuinte-form-page.component';
import { LocuintePage } from './locuinte.page';
import { LocuinteViewComponent } from './components/locuinte-view/locuinte-view.component';

const routes: Routes = [
  {
    path: '',
    component: LocuintePage,
  },
  {
    path: 'add',
    component: LocuinteFormPageComponent,
    data: {
      formMode: LocuinteFormModes.ADD_NEW_FULL,
    },
  },
  {
    path: 'edit/:id',
    component: LocuinteFormPageComponent,
    data: {
      formMode: LocuinteFormModes.EDIT_FULL,
    },
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
