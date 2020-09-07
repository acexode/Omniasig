import { Account } from './account.interface';

export interface LoginResponse {
  token?: string;
  // TODO: remove this once we implement token processing.
  account?: Account;
}
