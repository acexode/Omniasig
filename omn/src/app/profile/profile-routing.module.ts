import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfilePage } from './profile.page';

const routes: Routes = [
  {
    path: '',
    component: ProfilePage,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./main/profil/profil.module').then((m) => m.ProfilPageModule),
      },
      {
        path: 'date-personale',
        loadChildren: () =>
          import( './pages/date-personale/date-personale.module' ).then(
            ( m ) => m.DatePersonalePageModule
          ),
      },
      {
        path: 'locuinte',
        loadChildren: () =>
          import( './pages/locuinte/locuinte.module' ).then(
            ( m ) => m.LocuintePageModule
          ),
      },
      {
        path: 'documente',
        loadChildren: () =>
          import( './pages/documente/documente.module' ).then(
            ( m ) => m.DocumentePageModule
          ),
      },
    ],
  },
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ],
} )
export class ProfilePageRoutingModule { }
