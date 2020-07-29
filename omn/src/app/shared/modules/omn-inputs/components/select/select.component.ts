import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { get } from 'lodash';
import { IonSelectConfig } from 'src/app/shared/models/component/ion-select-config';
import { IonSelectListOption } from 'src/app/shared/models/component/ion-select-list-option';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: SelectComponent,
      multi: true,
    },
  ],
})
export class SelectComponent implements OnInit, ControlValueAccessor {
  @Input() config: IonSelectConfig;
  @Input() set options(opts: Array<IonSelectListOption>) {
    this.opts = opts;
    this.updateItems();
  }
  items: Array<{
    id: any;
    label: string;
  }> = [];
  private opts: Array<IonSelectListOption> = [];

  formGroup = this.fb.group({
    select: this.fb.control(null),
  });

  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;
  constructor(private fb: FormBuilder, private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  updateItems() {
    const labelK = get(this.config, 'labelKey', 'label');
    const idK = get(this.config, 'idKey', 'id');
    this.items = this.opts
      .map((v) => {
        return {
          id: get(v, idK, null),
          label: get(v, labelK, null),
        };
      })
      .filter((vv) => {
        return get(vv, 'id', null) !== null;
      });

    this.cdRef.markForCheck();
  }

  compareWithFn(o1, o2){
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  writeValue(obj: any): void {
    let value = this.value;
    this.value = obj;

    const force = (this.config = this.config
      ? get(this.config, 'forceListItems', false)
      : false);

    if (force) {
      value = this.filterValues(obj);
    } else {
      value = obj;
    }
    this.formGroup.setValue({ select: obj });
    this.formGroup.updateValueAndValidity();
    this.cdRef.markForCheck();
  }

  filterValues(obj: any) {
    return obj;
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
