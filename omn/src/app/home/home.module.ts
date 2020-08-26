import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../shared/shared.module';
import { HomePageRoutingModule } from './home-routing.module';
import { HomePage } from './home.page';
import { PolicySharedModule } from '../modules/policy/policy-shared.module';
import { FaqComponent } from './faq/faq.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomePageRoutingModule,
    IonicModule,
    HomePageRoutingModule,
    SharedModule,
    PolicySharedModule,
  ],
  declarations: [HomePage, FaqComponent],
})
export class HomePageModule {}
