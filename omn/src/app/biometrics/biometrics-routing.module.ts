import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BiometricsComponent } from './biometrics.component';
import { InfoComponent } from './info/info.component';

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
