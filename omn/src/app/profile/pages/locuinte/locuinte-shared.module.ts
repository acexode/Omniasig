import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocuinteService } from './services/locuinte.service';
import { LocuinteFormComponent } from './components/locuinte-form/locuinte-form.component';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LocuinteFormComponent],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [LocuinteService],
  exports: [LocuinteFormComponent],
})
export class LocuinteSharedModule {}
