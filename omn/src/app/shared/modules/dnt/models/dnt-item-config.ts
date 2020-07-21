import { IonIconItem } from 'src/app/shared/models/component/ion-icon-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { IonButtonItem } from 'src/app/shared/models/component/ion-button-item';

export interface DntItemConfig {
  top: {
    icon: IonIconItem;
    content: Array<IonTextItem>;
  };
  middle?: {
    classes?: string;
    icon: IonIconItem;
  };
  content: Array<IonTextItem>;
  buttons: {
    classes?: string;
    start?: IonButtonItem;
    end?: IonButtonItem;
  };
}
