import { IonSelectConfig } from '../models/component/ion-select-config';

export const selectConfigHelper = (conf: {
  label: string;
  force?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  idKey?: string;
  labelKey?: string;
}): IonSelectConfig => {
  const config: IonSelectConfig = {
    inputLabel: {
      classes: 'mb-8 input-label',
      text: conf.label,
    },
    forceListItems: conf.force || false,
    multiple: conf.multiple || false,
    disabled: conf.disabled || false,
    placeholder: 'Selectează',
    alertOptions: {
      customClass: 'omn-select-alert',
    },
    idKey: conf.idKey || 'id',
    labelKey: conf.labelKey || 'label',
  };
  return config;
};
