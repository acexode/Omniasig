import { ConfirmareInfoComponent } from './confirmare-info/confirmare-info.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiometricsComponent } from './biometrics.component';
import { InfoComponent } from './info/info.component';
import { ConfirmareIdentitateComponent } from './confirmare-identitate/confirmare-identitate.component';

const routes: Routes = [
  {
    path: '',
    component: BiometricsComponent,
    children: [],
  },
  {
    path: 'info',
    component: InfoComponent,
  },
  {
    path: 'confirmare-identitate',
    component: ConfirmareIdentitateComponent,
  },
  {
    path: 'confirmare-info',
    component: ConfirmareInfoComponent,
  },
  {
    path: 'more-details',
    loadChildren: () =>
      import('./more-details/more-details.module').then(
        (m) => m.MoreDetailsModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BiometricsRoutingModule {}
