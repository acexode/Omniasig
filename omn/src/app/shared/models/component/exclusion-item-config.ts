import { IonIconItem } from 'src/app/shared/models/component/ion-icon-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { IonButtonItem } from 'src/app/shared/models/component/ion-button-item';

export interface ExclusionItemConfig {
  content: Array<{
    type: 'icon' | 'text' | 'button';
    item: IonTextItem | IonIconItem | IonButtonItem;
    itemClasses?: string;
  }>;
  buttons: {
    classes?: string;
    start?: IonButtonItem;
    end?: IonButtonItem;
  };
}
