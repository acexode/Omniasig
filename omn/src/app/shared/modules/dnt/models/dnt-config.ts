import { IonIconItem } from 'src/app/shared/models/component/ion-icon-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

export interface DntConfig {
  top: {
    icon: IonIconItem;
    primary: IonTextItem;
    secondary: IonTextItem;
  };
  middle?: {
    icon: IonIconItem;
  };
  bottom: Array<IonTextItem>;
  buttons: {
    start: any;
    end: any;
  };
}
