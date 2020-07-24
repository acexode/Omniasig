import { DntItemConfig } from './dnt-item-config';

export interface DntConfig {
  items: Array<DntItemConfig>;
  success: DntItemConfig;
  cancel: DntItemConfig;
}
