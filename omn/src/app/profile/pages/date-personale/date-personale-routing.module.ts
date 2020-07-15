import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DatePersonaleFormModes } from 'src/app/shared/models/modes/date-personale-form-modes';
import { DatePersonaleFormComponent } from './components/date-personale-form/date-personale-form.component';
import { DatePersonalePage } from './date-personale.page';

const routes: Routes = [
  {
    path: '',
    component: DatePersonalePage,
  },
  {
    path: 'edit-email',
    component: DatePersonaleFormComponent,
    data: {
      formMode: DatePersonaleFormModes.EDIT_EMAIL,
    },
  },
  {
    path: 'edit-cnp',
    component: DatePersonaleFormComponent,
    data: {
      formMode: DatePersonaleFormModes.EDIT_CNP,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DatePersonalePageRoutingModule {}
