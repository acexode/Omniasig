import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';

export interface InsuranceListItem {
  id: string | number;
  routerLink?: any;
  itemClass?: string;
  leftIcon?: IonIconItem;
  rightIcon?: IonIconItem;
  textContent: {
    head?: IonTextItem;
    body: IonTextItem;
    footer?: IonTextItem;
  };
}
