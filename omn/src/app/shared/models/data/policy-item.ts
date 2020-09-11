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
  cesiune?: Array<{ cui: string; procent: number; denumireCesionar: string }>;
  // additional fields from the BE
  serial?: string;
  policyNrPolita?: string;
  policyNrChitanta?: string;
  policyIdIncasareOMN?: string;
  // Display
  type?: PolicyType;
  listingSubtitle?: string;
  locationValueCurrency?: any;
  locationValue?: any;
}
