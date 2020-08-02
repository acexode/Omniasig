import { IonButtonItem } from 'src/app/shared/models/component/ion-button-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

export interface PolicyItemFooter {
  classes?: string;
  leftButton?: IonButtonItem;
  rightLabel?: IonTextItem;
}
