import { Observable } from 'rxjs';
import { IonAutocompleteConfig } from '../models/component/ion-autocomplete-config';

export const autoCompleteConfigHelper = (conf: {
  label: string;
  dataServiceCb: (filter: any) => Observable<Array<any>>;
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
    dataServiceCb: conf.dataServiceCb,
  };
  return config;
};
