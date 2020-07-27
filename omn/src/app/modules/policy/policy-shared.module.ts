import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PolicyDataService } from './services/policy-data.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class PolicySharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PolicySharedModule,
      providers: [PolicyDataService],
    };
  }
}
