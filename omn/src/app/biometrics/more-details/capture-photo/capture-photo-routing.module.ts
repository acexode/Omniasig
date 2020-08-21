import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CapturePhotoComponent } from './capture-photo.component'
import { CompleteVerificationComponent } from './complete-verification/complete-verification.component'


const routes: Routes = [
  {
    path:'',
    component: CapturePhotoComponent,
    children: [
    ],
  },
  {
    path:'complete-verification',
    component: CompleteVerificationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CapturePhotoRoutingModule { }
