import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoreDetailsComponent } from './more-details.component'
import { CaptureDocsComponent } from './capture-docs/capture-docs.component'
import { CapturePhotoComponent} from './capture-photo/capture-photo.component'


const routes: Routes = [
  {
    path:'',
    component: MoreDetailsComponent,
    children: [
    ],
  },
  {
    path:'capture-docs',
    component: CaptureDocsComponent,
  },
  {
    path:'capture-photo',
    component: CapturePhotoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MoreDetailsRoutingModule { }
