import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocuinteService } from './services/locuinte/locuinte.service';
import { LocuinteFormComponent } from './components/locuinte-form/locuinte-form.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LocuinteFormService } from './services/locuinte-form/locuinte-form.service';
import { OmnInputsModule } from 'src/app/shared/modules/omn-inputs/omn-inputs.module';

@NgModule({
  declarations: [LocuinteFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    OmnInputsModule,
  ],
  providers: [LocuinteService, LocuinteFormService],
  exports: [LocuinteFormComponent],
})
export class LocuinteSharedModule {}
