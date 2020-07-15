import { AccountStates } from './account-states';

export interface Account {
  id: number | string;
  firstName: string;
  lastName: string;
  userIcon?: string;
  userStates: Array<AccountStates>;
}
