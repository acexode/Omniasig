import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-way-to-pay',
  templateUrl: './way-to-pay.component.html',
  styleUrls: ['./way-to-pay.component.scss'],
})
export class WayToPayComponent implements OnInit {
  @Input() payFormData;
  formGroup = this.fb.group({
    rate: this.fb.control(null, Validators.required),
    type: this.fb.control(null, Validators.required),
  });

  amplusPadGroup = this.fb.group({
    rate: this.fb.control(null, Validators.required),
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
  policyID;
  @Output() eventSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private fb: FormBuilder, private aRoute: ActivatedRoute) {}

  ngOnInit() {
    this.policyID = this.aRoute.snapshot.queryParamMap.get('policyID');
    if (this.payFormData && this.policyID === 'AMPLUS') {
      this.formGroup.setValue(this.payFormData);
    }
    if (this.payFormData && this.policyID === 'Garant AMPLUS+ PAD') {
      this.amplusPadGroup.setValue(this.payFormData);
    }
  }

  submit() {
    if (this.policyID === 'AMPLUS') {
      if (this.formGroup.valid) {
        this.eventSubmit.emit(this.formGroup.value);
      }
    } else {
      if (this.amplusPadGroup.valid) {
        this.eventSubmit.emit(this.amplusPadGroup.value);
      }
    }
  }
}
