import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PolicyPage } from './page/policy.page';
import { PolicyRoutingModule } from './policy-routing.module';
import { PolicySharedModule } from './policy-shared.module';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { PolicyComponent } from './components/policy/policy.component';

@NgModule({
  declarations: [PolicyPage, PolicyComponent],
  imports: [
    CommonModule,
    PolicyRoutingModule,
    PolicySharedModule,
    IonicModule,
    RouterModule,
    SharedModule,
  ],
})
export class PolicyModule {}
