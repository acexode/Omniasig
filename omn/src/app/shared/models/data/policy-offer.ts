import { PolicyItem } from './policy-item';

export interface PolicyOffer {
  id: string | number;
  policy: PolicyItem;
  expiry: Date | string;
}
