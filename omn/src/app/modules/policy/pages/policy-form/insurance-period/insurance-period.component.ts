import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { IonDateTimeConfig } from 'src/app/shared/models/component/ion-datetime-config';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-insurance-period',
  templateUrl: './insurance-period.component.html',
  styleUrls: ['./insurance-period.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsurancePeriodComponent implements OnInit {
  @Input() minDate;
  @Input() maxDate;

  formGroup = this.fb.group({
    date: this.fb.control('', Validators.required),
  });

  newProp: IonDateTimeConfig = {
    displayFormat: 'DD/MM/YYYY',
    inputLabel: {
      text: 'Data de început',
      classes: 'input-label mb-8',
    },
    pickerOptions: {
      cssClass: 'custom-datepicker',
    },
    pickerFormat: 'D, MMM, YYYY',
    placeholder: 'Selectează',
  };

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.cdRef.markForCheck();
  }

  submit() {}
}
