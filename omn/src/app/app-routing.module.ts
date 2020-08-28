import { LoginGuard } from './core/guards/login/login.guard';
import { AuthGuard } from './core/guards/auth/auth.guard';
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
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'policy',
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./modules/policy/policy.module').then((m) => m.PolicyModule),
  },
  {
    path: 'profil',
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
  },
  {
    path: 'login',
    canActivateChild:[LoginGuard],
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registration',
    canActivateChild:[LoginGuard],
    loadChildren: () =>
      import('./registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'phone-number',
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./schimbare-numar-telefon/schimbare-numar-telefon.module').then(
        (m) => m.SchimbareNumarTelefonPageModule
      ),
  },
  {
    path: 'contact',
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./modules/contact/contact.module').then(
        (m) => m.ContactPageModule
      ),
  },
  {
    path: 'reset-pincode',
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./pin-code-reset/pin-code-reset.module').then(
        (m) => m.PinCodeResetPageModule
      ),
  },
  {
    path: 'asistenta',
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./modules/asistenta/asistenta.module').then(
        (m) => m.AsistentaPageModule
      ),
  },
  {
    path: 'biometrics',
    canActivateChild:[AuthGuard],
    loadChildren: () =>
      import('./biometrics/biometrics.module').then((m) => m.BiometricsModule),
  },
  {
    path: 'setari',
    canActivateChild:[AuthGuard],
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
