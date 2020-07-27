import { DntConfig } from '../../modules/dnt/models/dnt-config';

export interface PolicyType {
  id: string | number;
  name: string;
  shortDescription: string;
  dntConfig?: DntConfig;
}
