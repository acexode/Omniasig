import { IonInputConfig } from '../models/component/ion-input-config';
import { get, has, assignIn } from 'lodash';

export const inputConfigHelper = (conf: {
  label: string;
  type: string;
  placeholder: string;
  custom?: IonInputConfig;
}): IonInputConfig => {
  const config: IonInputConfig = {
    type: get(conf, 'type', 'text'),
    placeholder: get(conf, 'placeholder', ''),
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
