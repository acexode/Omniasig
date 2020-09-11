import { BehaviorSubject, Observable } from 'rxjs';
import { IonAutocompleteConfig } from '../models/component/ion-autocomplete-config';

export const autoCompleteConfigHelper = (conf: {
  label: string;
  disabled: boolean;
  dataServiceCb: (filter: any) => Observable<Array<any>>;
  dataServiceSource: BehaviorSubject<any>;
}): IonAutocompleteConfig => {
  const config: IonAutocompleteConfig = {
    inputLabel: {
      classes: 'mb-8 input-label',
      text: conf.label,
    },
    labelKey: 'label',
    idKey: 'id',
    clearInvalid: false,
    autocompleteOptions: {
      placeholder: 'Selectează',
      searchIcon: null,
      noItems: 'Nu a fost gasit nici un rezultat.',
    },
    disabled: conf?.disabled,
    dataServiceCb: conf.dataServiceCb,
    dataServiceSource: conf.dataServiceSource,
  };
  return config;
};
