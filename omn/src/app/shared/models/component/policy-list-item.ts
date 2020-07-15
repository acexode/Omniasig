import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';

export interface PolicyListItem {
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
