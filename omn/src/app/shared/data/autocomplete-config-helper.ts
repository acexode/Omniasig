import { BehaviorSubject, Observable } from 'rxjs';
import { IonAutocompleteConfig } from '../models/component/ion-autocomplete-config';

export const autoCompleteConfigHelper = (conf: {
  label: string;
  disabled: boolean;
  clearInvalid?: boolean;
  dataServiceCb: (filter: any) => Observable<Array<any>>;
  dataServiceSource: BehaviorSubject<any>;
  idKey?: string;
  labelKey?: string;
  detailAttribute?: string;
  autoCapitalize?: string;
}): IonAutocompleteConfig => {
  const config: IonAutocompleteConfig = {
    inputLabel: {
      classes: 'mb-8 input-label',
      text: conf.label,
    },
<<<<<<< HEAD
    clearInvalid: true,
=======
    clearInvalid: conf.clearInvalid,
>>>>>>> 0c01ceb476f5e890ab66b4877a2dbcb18a70de1d
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
    detailAttribute: conf.detailAttribute,
  };

  return config;
};
