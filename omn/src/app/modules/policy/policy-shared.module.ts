import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { Calendar } from '@ionic-native/calendar/ngx';
import { PolicyDataService } from './services/policy-data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class PolicySharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PolicySharedModule,
      providers: [PolicyDataService, Calendar],
    };
  }
}
