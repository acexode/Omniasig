import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
} from '@angular/forms';
import { IonRadiosConfig } from 'src/app/shared/models/component/ion-radios-config';

@Component({
  selector: 'app-radios',
  templateUrl: './radios.component.html',
  styleUrls: ['./radios.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: RadiosComponent,
      multi: true,
    },
  ],
})
export class RadiosComponent implements OnInit, ControlValueAccessor {
  @Input() config: IonRadiosConfig;

  formGroup = this.fb.group({
    radio: this.fb.control(null),
  });

  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;

  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  registerOnChange(fn) {
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
}
