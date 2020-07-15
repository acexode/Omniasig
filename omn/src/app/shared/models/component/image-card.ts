import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';

export interface ImageCard {
  headerIcon?: IonIconItem;
  mainIcon?: IonIconItem;
  textContent?: Array<IonTextItem>;
  id: string | number;
  routerLink?: any;
  itemClass?: string;
}
