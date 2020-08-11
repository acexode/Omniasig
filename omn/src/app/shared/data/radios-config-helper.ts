import { assignIn, get, has } from 'lodash';
import { IonRadiosConfig } from '../models/component/ion-radios-config';

export const radiosConfigHelper = (conf: {
  label: string;
  mode: string;
  custom?: IonRadiosConfig;
}): IonRadiosConfig => {
  const config: IonRadiosConfig = {
    mode: get(conf, 'mode', 'item'),
    inputLabel: {
      text: get(conf, 'label', ''),
    },
  };
  if (has(conf, 'custom')) {
    return assignIn(config, get(conf, 'custom', {}));
  } else {
    return config;
  }
};
