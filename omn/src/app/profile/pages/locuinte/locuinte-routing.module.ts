import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  LocuinteFormModes,
  LocuinteFormType,
} from 'src/app/shared/models/modes/locuinte-form-modes';
import { LocuinteFormPageComponent } from './components/locuinte-form-page/locuinte-form-page.component';
import { LocuinteViewComponent } from './components/locuinte-view/locuinte-view.component';
import { LocuintePage } from './locuinte.page';
import { LocuintaState } from 'src/app/shared/models/data/locuinte.interface';

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
      locuinta: null,
    },
  },
  {
    path: 'edit/:id',
    component: LocuinteFormPageComponent,
    data: {
      formMode: LocuinteFormModes.EDIT_FULL,
      locuinta: null,
    },
  },
  {
    path: 'view/:id',
    component: LocuinteViewComponent,
  },
  {
    path: 'incomplete/:id',
    component: LocuinteViewComponent,
    data: {
      formMode: LocuintaState.INCOMPLETE,
      formStep: LocuinteFormType.ADDRESS,
      locuinta: null,
    },
  },
  {
    path: 'invalid/:id',
    component: LocuinteViewComponent,
    data: {
      formMode: LocuintaState.INVALID,
      formStep: LocuinteFormType.ADDRESS,
      locuinta: null,
    },
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
} )
export class LocuintePageRoutingModule { }
