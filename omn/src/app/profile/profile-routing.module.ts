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
          import('./pages/date-personale/date-personale.module').then(
            (m) => m.DatePersonalePageModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfilePageRoutingModule {}
