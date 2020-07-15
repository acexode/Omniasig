import { AccountStates } from "./account-states";

export interface Account {
  id: number | string;
  firstName: string;
  lastName: string;
  userIcon?: string;
  email: string;
  cnp: string;
  addresses: string[];
  userStates: Array<AccountStates>;
}
