import { BehaviorSubject, Observable } from 'rxjs';
import { IonAutocompleteConfig } from '../models/component/ion-autocomplete-config';

export const autoCompleteConfigHelper = (conf: {
  label: string;
  disabled: boolean;
  dataServiceCb: (filter: any) => Observable<Array<any>>;
  dataServiceSource: BehaviorSubject<any>;
  idKey?: string;
  labelKey?: string;
  streetType?: string;
  autoCapitalize?: string;
}): IonAutocompleteConfig => {
  console.log("AUTO COMPLETE CONFIG", conf)
  const config: IonAutocompleteConfig = {
    inputLabel: {
      classes: 'mb-8 input-label',
      text: conf.label,
    },
    clearInvalid: false,
    autocompleteOptions: {
      placeholder: 'Selectează',
      searchIcon: null,
      noItems: 'Nu a fost gasit nici un rezultat.',
    },
    disabled: conf?.disabled,
    dataServiceCb: conf.dataServiceCb,
    dataServiceSource: conf.dataServiceSource,
    idKey: conf.idKey || 'id',
    labelKey: conf.labelKey || 'label',
    streetType: conf.streetType || 'streetType',
  };

  return config;
};
