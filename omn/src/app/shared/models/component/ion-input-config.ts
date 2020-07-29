import { IonTextItem } from './ion-text-item';

export interface IonInputConfig {
  inputLabel: IonTextItem;
  placeholder?: string;
  inputName?: string;
  type: string;
  size?: number;
  // Number input.
  step?: number;
  min?: number;
  max?: number;

  // Text types.
  clearable?: boolean;

  // General properties.
  maxLength?: number;
  minLength?: number;
  autoComplete?: boolean;
  autoCorrect?: boolean;
  inputMode?: string;
}
