import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { PolicySharedModule } from '../../policy-shared.module';
import { PolicyVerifyRoutingModule } from './policy-verify-routing.module';
import { PolicyVerifyComponent } from './policy-verify.component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    PolicySharedModule,
    SharedModule,
    PolicyVerifyRoutingModule,
  ],
  declarations: [PolicyVerifyComponent],
})
export class PolicyVerifyModule {}
