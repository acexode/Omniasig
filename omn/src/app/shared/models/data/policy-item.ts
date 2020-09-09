import { PolicyType } from './policy-type';
import { PolicyStates } from './policy-states';
import { Locuinte } from './locuinte.interface';

export interface PolicyItem {
  // Data
  id: number;
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
  // Display
  type?: PolicyType;
  listingSubtitle?: string;
}
