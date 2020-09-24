import { Account } from './account.interface';

export interface LoginResponse {
  token?: string;
  expiration: string;
  // TODO: remove this once we implement token processing.
  account?: Account;
}
