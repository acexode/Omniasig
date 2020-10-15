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
  // for Amplus+PAD where some fields in the offer details of Amplus differs from the offer details of PAD
  padInsurance?: UniquePadData;
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

export interface UniquePadData {
  id: string;
  offerCode?: string;
  currency?: string;
  offerPrice?: number;
  firstPaymentValue?: number;
  iban?: any;
}
