import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { FaqComponent } from './faq/faq.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'intrebari-frecvente',
    component: FaqComponent,
  },
  {
    path: 'despre-noi',
    loadChildren: () =>
      import('./despre-noi/despre-noi.module').then(
        (m) => m.DespreNoiPageModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
