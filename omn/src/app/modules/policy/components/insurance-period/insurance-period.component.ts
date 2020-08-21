import {
  Component,
  Input,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
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
  currentDate = new Date();
  @Input() minDate = new Date();
  @Input() maxDate;

  @Input() preselectedStart = null;
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
  @Output() emitForm: EventEmitter<any> = new EventEmitter();
  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {
    this.newProp.min = this.minDate.toISOString();
    this.newProp.max = this.maxDate
      ? this.maxDate
      : new Date(
          this.currentDate.setFullYear(this.currentDate.getFullYear() + 1)
        ).toISOString();
    debugger;
    this.preselectFormData();
    this.cdRef.markForCheck();
  }

  preselectFormData() {
    const field = this.formGroup.get('date');
    if (field && this.preselectedStart) {
      field.setValue(this.preselectedStart);
      field.updateValueAndValidity();
    }
  }
  submit() {
    if (this.formGroup.valid) {
      const field = this.formGroup.get('date');
      if (field) {
        this.emitForm.emit(field.value);
      }
    } else {
      this.formGroup.updateValueAndValidity();
      this.cdRef.markForCheck();
    }
  }
}
