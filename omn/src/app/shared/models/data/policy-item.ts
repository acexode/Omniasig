import { PolicyType } from './policy-type';
import { PolicyStates } from './policy-states';
import { Locuinte } from './locuinte.interface';

export interface PolicyItem {
  // Data
  id: string | number;
  name: string;
  typeId: string;
  state: PolicyStates;
  locuintaId: string | number;
  locuintaData?: Locuinte;
  userId: string | number;
  userData?: any;
  dates?: {
    from: Date | string;
    to: Date | string;
  };
  // Display
  type?: PolicyType;
  listingSubtitle?: string;
}
