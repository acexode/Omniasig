import { PolicyItem } from './policy-item';

export interface PolicyOffer {
  id: string;
  policy: PolicyItem;
  expiry: Date | string;
  cnp?: string;
  nume?: string;
  offerCode?: string;
}
