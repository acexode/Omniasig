import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';
import { ImageCard } from './image-card';

export interface DisabledPlaceholderCard {
  leftColumnClass?: string;
  rightColumnClass?: string;
  cards?: Array<ImageCard>;
  textContent?: Array<IonTextItem>;
  id: string | number;
  routerLink?: any;
  itemClass?: string;
  color?: string;
}
