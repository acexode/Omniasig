import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { LoginGuard } from './core/guards/login/login.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'profil',
    pathMatch: 'full',
  },
  {
    path: 'home',
    canActivateChild: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './home/home.module' ).then( ( m ) => m.HomePageModule ),
  },
  {
    path: 'policy',
    // canActivateChild: [ AuthGuard ],
    // canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './modules/policy/policy.module' ).then( ( m ) => m.PolicyModule ),
  },
  {
    path: 'profil',
    // canActivateChild: [ AuthGuard ],
    // canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './profile/profile.module' ).then( ( m ) => m.ProfilePageModule ),
  },
  {
    path: 'login',
    canActivateChild: [ LoginGuard ],
    canActivate: [ LoginGuard ],
    loadChildren: () =>
      import( './login/login.module' ).then( ( m ) => m.LoginPageModule ),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import( './registration/registration.module' ).then(
        ( m ) => m.RegistrationPageModule
      ),
  },
  {
    path: 'phone-number',
    canActivateChild: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './schimbare-numar-telefon/schimbare-numar-telefon.module' ).then(
        ( m ) => m.SchimbareNumarTelefonPageModule
      ),
  },
  {
    path: 'cod-acces',
    canActivate: [ AuthGuard ],
    canActivateChild: [ AuthGuard ],
    loadChildren: () =>
      import( './schimbare-cod-acces/schimbare-cod-acces.module' ).then(
        ( m ) => m.SchimbareCodAccesPageModule
      ),
  },
  {
    path: 'contact',
    canActivateChild: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './modules/contact/contact.module' ).then(
        ( m ) => m.ContactPageModule
      ),
  },
  {
    path: 'reset-pincode',
    canActivateChild: [ LoginGuard ],
    canActivate: [ LoginGuard ],
    loadChildren: () =>
      import( './pin-code-reset/pin-code-reset.module' ).then(
        ( m ) => m.PinCodeResetPageModule
      ),
  },
  {
    path: 'asistenta',
    canActivateChild: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './modules/asistenta/asistenta.module' ).then(
        ( m ) => m.AsistentaPageModule
      ),
  },
  {
    path: 'biometrics',
    canActivateChild: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './biometrics/biometrics.module' ).then( ( m ) => m.BiometricsModule ),
  },
  {
    path: 'setari',
    canActivateChild: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './modules/setari/setari.module' ).then( ( m ) => m.SetariPageModule ),
  },
  {
    path: 'phone-number',
    canActivateChild: [ AuthGuard ],
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import( './schimbare-numar-telefon/schimbare-numar-telefon.module' ).then(
        ( m ) => m.SchimbareNumarTelefonPageModule
      ),
  },
  {
    path: 'reset-pincode',
    loadChildren: () =>
      import( './pin-code-reset/pin-code-reset.module' ).then(
        ( m ) => m.PinCodeResetPageModule
      ),
  },
  {
    path: '**',
    redirectTo: 'home',
  },
];

@NgModule( {
  imports: [
    RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules } ),
  ],
  exports: [ RouterModule ],
} )
export class AppRoutingModule { }
