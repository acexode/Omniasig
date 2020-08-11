import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { get } from 'lodash';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: InputComponent,
      multi: true,
    },
  ],
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() config: IonInputConfig;

  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;

  formGroup = this.fb.group({
    input: this.fb.control(null),
  });

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  writeValue(obj: any): void {
    this.value = obj;
    this.formGroup.setValue({ input: obj });
    this.formGroup.updateValueAndValidity();
    this.cdRef.markForCheck();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.formGroup.disable({ emitEvent: true });
    } else {
      this.formGroup.enable({ emitEvent: true });
    }
    this.cdRef.markForCheck();
  }

  getFieldValue() {
    const field = this.formGroup.get('input');
    return field ? field.value : null;
  }
  ngOnInit() {
    this.formGroup.valueChanges.subscribe((vals) => {
      if (this.onChange) {
        this.onChange(this.getFieldValue());
      }
    });
  }

  increment() {
    const max = get(this.config, 'max', null);
    const step = get(this.config, 'step', 1);
    let val = this.getFieldValue();
    val = val !== null && val !== undefined && val !== '' ? val : 0;
    const newV = val + step;
    if (val !== null && newV >= max) {
      this.writeValue(max ? max : newV);
    } else {
      this.writeValue(newV);
    }
  }

  decrement() {
    const min = get(this.config, 'min', 0);
    const step = get(this.config.spinnerConfig.step, 'step', 1);
    let val = this.getFieldValue();
    val = val !== null && val !== undefined && val !== '' ? val : 0;
    const newV = val - step;
    if (val !== null && newV <= min) {
      this.writeValue(min);
    } else {
      this.writeValue(val - step);
    }
  }
}