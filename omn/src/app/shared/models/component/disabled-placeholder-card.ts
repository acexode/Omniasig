import { ImageCard } from './image-card';
import { IonTextItem } from './ion-text-item';

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
