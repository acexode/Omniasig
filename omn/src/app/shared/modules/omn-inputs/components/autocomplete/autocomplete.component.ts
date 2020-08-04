import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { get } from 'lodash';
import { AutocompleteProviderService } from '../../services/autocomplete-provider.service';
import { IonAutocompleteConfig } from 'src/app/shared/models/component/ion-autocomplete-config';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AutocompleteComponent,
      multi: true,
    },
    // We want separate providers.
    AutocompleteProviderService,
  ],
})
export class AutocompleteComponent implements OnInit, ControlValueAccessor {
  aConfig: IonAutocompleteConfig;
  @Input() set config(conf: IonAutocompleteConfig) {
    this.aConfig = conf;
    if (conf) {
      console.log(conf);
      this.autocompleteProvider.updateConfig({
        labelAttribute: get(conf, 'labelKey', 'label'),
        formValueAttribute: get(conf, 'idKey', 'label'),
        dataServiceCb: conf.dataServiceCb,
      });
    }
  }

  get config() {
    return this.aConfig;
  }
  formGroup = this.fb.group({
    text: this.fb.control(null),
  });

  onChange: (_: any) => void;
  onTouched: () => void;
  value: any;

  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public autocompleteProvider: AutocompleteProviderService
  ) {}

  getFieldValue() {
    const field = this.formGroup.get('text');
    return field ? field.value : null;
  }

  ngOnInit() {
    this.formGroup.valueChanges.subscribe((vals) => {
      if (this.onChange) {
        this.onChange(this.getFieldValue());
      }
    });
  }

  writeValue(obj: any): void {
    this.value = obj;
    this.formGroup.setValue({ text: obj });
    this.formGroup.updateValueAndValidity();
    this.cdRef.markForCheck();
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
