import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';

export interface SubPageHeader {
  headerClasses?: string;
  toolbarClasses?: string;
  toolbarColor?: string;
  leadingIcon?: IonIconItem;
  trailingIcon?: IonIconItem;
  title?: IonTextItem;
}
