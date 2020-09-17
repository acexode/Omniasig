import { IonIconItem } from './ion-icon-item';
import { IonTextItem } from './ion-text-item';
import { TemplateRef } from '@angular/core';

export interface ImageCard {
  headerIcon?: IonIconItem;
  isButton?: boolean;
  mainIcon?: IonIconItem;
  textContent?: Array<IonTextItem>;
  contentClass?: string;
  textClass?: string;
  contentRef?: {
    item: TemplateRef<any>;
    data?: any;
    classes?: string;
  };
  id: string | number;
  routerLink?: any;
  itemClass?: string;
  isDisabled?: boolean;
  isHidden?: boolean;
}
