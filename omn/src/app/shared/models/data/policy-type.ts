import { DntConfig } from '../../modules/dnt/models/dnt-config';
import { IonIconItem } from '../component/ion-icon-item';
import { ExclusionConfig } from './../component/exclusion-config';

export interface PolicyType {
  id: string | number;
  order: number;
  name: string;
  shortDescription: string;
  dntConfig?: DntConfig;
  exclusionConfig?: ExclusionConfig;
  listingIcon?: IonIconItem;
}
