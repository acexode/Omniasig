import { AccountStates } from './account-states';

export interface Account {
  userId?: number | string;
  cnp?: string;
  email?: string;
  name: string;
  surname: string;
  userIcon?: string;
  addresses?: string[];
  phoneNumber?: string;
  userName?: string;
  isPublicPerson?: boolean;
  userStates?: Array<AccountStates>;
  roles?: string[];
  pin?: number;
  dateBirth?: string;
  marketing?: boolean;
  isBiometricValid?: boolean;
  isEmailConfirmed?: boolean;
  // Old model stuff
  firstName?: string;
  lastName?: string;
}
