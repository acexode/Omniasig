import { ExclusionItemConfig } from './exclusion-item-config';

export interface ExclusionConfig {
  items: Array<ExclusionItemConfig>;
  success?: ExclusionItemConfig;
  cancel?: ExclusionItemConfig;
}
