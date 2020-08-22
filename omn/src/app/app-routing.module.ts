import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'policy',
    loadChildren: () =>
      import('./modules/policy/policy.module').then((m) => m.PolicyModule),
  },
  {
    path: 'asistenta',
    loadChildren: () =>
      import('./modules/policy/asistenta-technica/asistenta-technica.module').then((m) => m.AsistentaTechnicaPageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
