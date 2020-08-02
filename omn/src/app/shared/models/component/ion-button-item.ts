import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';

export interface IonButtonItem {
  id?: string;
  color?: string;
  classes?: string;
  icon?: IonIconItem;
  iconPos?: 'start' | 'end';
  text?: IonTextItem;
  expand?: string;
  fill?: string;
  size?: string;
  slot?: string;
  shape?: string;
  // Use this to store data for special configs.
  data?: any;
}
