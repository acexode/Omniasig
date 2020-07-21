import { IonIconItem } from 'src/app/shared/models/component/ion-icon-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { IonButtonItem } from 'src/app/shared/models/component/ion-button-item';

export interface DntItemConfig {
  top: {
    icon: IonIconItem;
    primary: IonTextItem;
    secondary: IonTextItem;
  };
  middle?: {
    icon: IonIconItem;
  };
  content: Array<IonTextItem>;
  buttons: {
    start?: IonButtonItem;
    end?: IonButtonItem;
  };
}
