import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreDetailsComponent } from './more-details.component'


const routes: Routes = [
  {
    path:'',
    component: MoreDetailsComponent,
    children: [
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreDetailsRoutingModule { }
