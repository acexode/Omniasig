import { IonSelectConfig } from '../models/component/ion-select-config';

export const selectConfigHelper = (conf: {
  label: string;
  force?: boolean;
  multiple?: boolean;
}): IonSelectConfig => {
  const config: IonSelectConfig = {
    inputLabel: {
      classes: 'mb-8 input-label',
      text: conf.label,
    },
    forceListItems: conf.force || false,
    multiple: conf.multiple || false,
    placeholder: 'Selectează',
    alertOptions: {
      customClass: 'omn-select-alert',
    },
  };
  return config;
};
