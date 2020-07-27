import { PolicyType } from './policy-type';
import { PolicyStates } from './policy-states';

export interface PolicyItem {
  // Data
  id: string | number;
  name: string;
  typeId: string;
  state: PolicyStates;
  dates?: {
    from: Date | string;
    to: Date | string;
  };
  // Display
  type?: PolicyType;
  listingSubtitle?: string;
}
