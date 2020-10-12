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
  ratePlanList?: RatePlan[];
  offerPrice?: number;
  firstPaymentValue?: number;
  insurancePrice?: any;
  /* noOfPayments: AMPLUS */
  noOfPayments?: number;
}

export interface RatePlan {
  id: string | number;
  amount: number;
  currency: string;
  rateNumber: number;
  dueDatea: Date;
  AsiguratedSum?: any;
  expireDate?: any;
  insurancePrice?: any;
  firstPaymentValue?: any;
  ratePlanList?: Array<any>;
}
