import { DntConfig } from '../../modules/dnt/models/dnt-config';
import { IonIconItem } from '../component/ion-icon-item';

export interface PolicyType {
  id: string | number;
  order: number;
  name: string;
  shortDescription: string;
  dntConfig?: DntConfig;
  listingIcon?: IonIconItem;
}
