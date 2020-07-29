import { IonTextItem } from './ion-text-item';
import { IonIconItem } from './ion-icon-item';
import { ImageCard } from './image-card';

export interface IonRadiosConfig {
  mode: 'chip' | 'item' | 'icon';
  inputLabel: IonTextItem;
  idKey?: string;
  labelKey: string;
  name?: string;
}
