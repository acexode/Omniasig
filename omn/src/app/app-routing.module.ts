import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
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
    path: 'profil',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'phone-number',
    loadChildren: () =>
      import('./schimbare-numar-telefon/schimbare-numar-telefon.module').then(
        (m) => m.SchimbareNumarTelefonPageModule
      ),
  },
  {
    path: 'cod-acces',
    loadChildren: () =>
      import('./schimbare-cod-acces/schimbare-cod-acces.module').then(
        (m) => m.SchimbareCodAccesPageModule,
      ),
  },
  {
    path: 'contact',
    loadChildren: () =>
      import('./modules/contact/contact.module').then(
        (m) => m.ContactPageModule
      ),
  },
  {
    path: 'reset-pincode',
    loadChildren: () =>
      import('./pin-code-reset/pin-code-reset.module').then(
        (m) => m.PinCodeResetPageModule
      ),
  },
  {
    path: 'asistenta',
    loadChildren: () =>
      import('./modules/asistenta/asistenta.module').then(
        (m) => m.AsistentaPageModule
      ),
  },
  {
    path: 'biometrics',
    loadChildren: () =>
      import('./biometrics/biometrics.module').then((m) => m.BiometricsModule),
  },
  {
    path: 'setari',
    loadChildren: () =>
      import('./modules/setari/setari.module').then((m) => m.SetariPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
