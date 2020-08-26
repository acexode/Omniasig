import { Account } from './account.interface';

export interface LoginResponse {
  token?: {
    token:string,
    expiration:Date
  };
  // TODO: remove this once we implement token processing.
  account?: Account;
}
