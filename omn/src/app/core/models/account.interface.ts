import { AccountStates } from './account-states';

export interface Account {
  firstName: string;
  lastName: string;
  userIcon?: string;
  userStates: Array<AccountStates>;
}
