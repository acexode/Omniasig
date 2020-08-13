import { IonTextItem } from './ion-text-item';

export interface IonInputConfig {
  inputLabel?: IonTextItem;
  placeholder?: string;
  inputName?: string;
  type?: string;
  size?: number;
  min?: number;
  max?: number;
  inputClasses?: string;
  spinnerConfig?: {
    // Number input.
    step?: number;
  };

  // Text types.
  clearable?: boolean;

  // General properties.
  maxLength?: number;
  minLength?: number;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  inputMode?: string;
}
