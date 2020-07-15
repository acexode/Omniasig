import { AccountStates } from "./account-states";

export interface Account {
  firstName: string;
  lastName: string;
  userIcon?: string;
  email: string;
  cnp: string;
  addresses: string[];
  userStates: Array<AccountStates>;
}
