import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';
import { TemplateRef } from '@angular/core';

export interface ImageCard {
  headerIcon?: IonIconItem;
  isButton?: boolean;
  mainIcon?: IonIconItem;
  textContent?: Array<IonTextItem>;
  contentRef?: TemplateRef<any>;
  contentRefData?: any;
  id: string | number;
  routerLink?: any;
  itemClass?: string;
}
