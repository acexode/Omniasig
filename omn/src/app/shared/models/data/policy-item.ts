import { PolicyType } from './policy-type';
import { PolicyStates } from './policy-states';

export interface PolicyItem {
  // Data
  id: string | number;
  name: string;
  typeId: string;
  state: PolicyStates;
  // Display
  type?: PolicyType;
  listingSubtitle?: string;
}
