import { IonDateTimeConfig } from '../models/component/ion-datetime-config';

export const dateTimeConfigHelper = (conf: {
  label: string;
  displayFormat: string;
  pickerFormat: string;
  disabled?: boolean;
}): IonDateTimeConfig => {
  const config: IonDateTimeConfig = {
    inputLabel: {
      classes: 'mb-8 input-label',
      text: conf.label,
    },
    displayFormat: conf.displayFormat,
    pickerFormat: conf.pickerFormat,
    placeholder: 'Selectează',
    disabled: conf?.disabled,
    pickerOptions: {
      cssClass: 'custom-datepicker',
    },
  };
  return config;
};
