import { Account } from './account.interface';

export interface AuthState {
  init: boolean;
  accountInit?: boolean;
  account?: Account;
  UserId?: string;
  authToken?: string;
  expiryDate?: any;
}
