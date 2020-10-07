import { PolicyItem } from './policy-item';

export interface PolicyOffer {
  id: string;
  policy: PolicyItem;
  expiry: Date | string;
  cnp?: string;
  nume?: string;
  offerCode?: string;
  iban?: string;
  prima?: string | number;
  currency?: string;
  emisionDate?: string | Date;
  // New AMPLUS.
  supportData?: any;
  payData?: any;
  AsiguratedSum?: any;
  expireDate?: any;
  insurancePrice?: any;
  firstPaymentValue?: any;
}
