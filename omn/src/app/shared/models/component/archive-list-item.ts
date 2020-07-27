import { IonTextItem } from './ion-text-item';
import { IonIconItem } from './ion-icon-item';

export interface ArchiveListItem {
  id: string | number;
  routerLink?: any;
  icon?: IonIconItem;
  title: IonTextItem;
  content?: IonTextItem;
  timeContent?: IonTextItem;
  classes?: string;
}
