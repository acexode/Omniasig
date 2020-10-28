import { distinctCheckObj } from './../../../../../core/helpers/distinct-check.helper';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormBuilder,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { get } from 'lodash';
import { distinctUntilChanged } from 'rxjs/operators';
import { IonAutocompleteConfig } from 'src/app/shared/models/component/ion-autocomplete-config';
import { AutocompleteProviderService } from '../../services/autocomplete-provider.service';

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
  @ViewChild('autoField', { static: true }) autoField: any;
  aConfig: IonAutocompleteConfig;
  @Input() set config(conf: IonAutocompleteConfig) {
    if (this.autoField && conf) {
      const placeholder = get(conf, 'autocompleteOptions.placeholder', null);
      const defOpts = get(this.autoField, 'defaultOpts', null);
      if (placeholder && defOpts) {
        defOpts.placeholder = placeholder;
      }
    }
    this.aConfig = conf;
    if (conf) {
      this.autocompleteProvider.updateConfig({
        labelAttribute: get(conf, 'labelKey', 'label'),
        detailAttribute: get(conf, 'detailAttribute', 'label'),
        formValueAttribute: get(conf, 'idKey', 'label'),
        dataServiceCb: conf.dataServiceCb,
        dataServiceSource: conf.dataServiceSource,
      });
    }
    this.cdRef.markForCheck();
  }
  get config() {
    return this.aConfig;
  }

  @Input() template: TemplateRef<any>;
  @Input() selectionTemplate: TemplateRef<any>;

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
    return field ? get(field.value, 'label', field.value) : null;
  }

  ngOnInit() {
    this.formGroup.valueChanges
      .pipe(distinctUntilChanged(distinctCheckObj))
      .subscribe((vals) => {
        if (this.onChange) {
          this.onChange(this.getFieldValue());
        }
      });
  }

  writeValue(obj: any): void {
    try {
      this.value = obj.toString().trim().length > 0 ? obj.toString() : '';
    } catch (e) {
      this.value = '';
    }
    this.formGroup.setValue({
      text: this.value.length ? { label: obj } : null,
    });
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
