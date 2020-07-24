import { AccountStates } from './account-states';

export interface Account {
  id: number | string;
  cnp?: string;
  email?: string;
  firstName: string;
  lastName: string;
  userIcon?: string;
  addresses: string[];
  userStates: Array<AccountStates>;
}
