import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-way-to-pay',
  templateUrl: './way-to-pay.component.html',
  styleUrls: ['./way-to-pay.component.scss'],
})
export class WayToPayComponent implements OnInit {
  @Input() payFormData;
  formGroup = this.fb.group({
    rate: this.fb.control(1, Validators.required),
    type: this.fb.control(null, Validators.required),
  });

  fieldConfig = {
    currency: {
      inputLabel: { text: 'Moneda' },
      mode: 'chip',
    },
    rates: {
      inputLabel: { text: 'Număr de rate' },
      mode: 'chip',
    },
  };

  fieldConfigData = {
    currency: [
      { id: 'EUR', label: 'Euro' },
      { id: 'RON', label: 'Lei' },
    ],
    rates: [
      { id: '1', label: '1 rată' },
      { id: '2', label: '2 rate' },
      { id: '4', label: '4 rate' },
    ],
  };

  @Output() eventSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    if (this.payFormData && this.formGroup) {
      this.formGroup.setValue(this.payFormData);
    }
  }

  submit() {
    if (this.formGroup.valid) {
      this.eventSubmit.emit(this.formGroup.value);
    }
  }
}
