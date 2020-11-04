import { PolicyItem } from './policy-item';

export interface PolicyOffer {
  id: string;
  padOfferDocumentId?: any;
  padPolicyDocumentId?: any;
  amplusOfferDocumentId?: any;
  amplusPolicyDocumentId?: any;
  policy: PolicyItem;
  expiry: Date | string;
  cnp?: string;
  nume?: string;
  offerCode?: string;
  iban?: string;
  prima?: string | number;
  offerPrimaConverted?: string | number;
  currency?: string;
  emisionDate?: string | Date;
  // New AMPLUS.
  supportData?: any;
  payData?: any;
  ratePlanList?: RatePlan[];
  offerPrice?: number;
  offerCurrency?: number;
  firstPaymentValue?: number;
  insurancePrice?: any;
  insurancePriceCurrency?: any;
  /* noOfPayments: AMPLUS */
  noOfPayments?: number;
  // for Amplus+PAD where some fields in the offer details of Amplus differs from the offer details of PAD
  padInsurance?: UniquePadData;
  euroExchangeRate?: ExchangeRate;
  currencyUserSelectedToPayIn?: string;
  // payment
  firstPaymentValueConverted?: number;
  // Conversion enabled.
  euroToRonConversion?: boolean;
  // totals - amplus + pad
  totalRon?: number | string;
  totalEur?: number | string;

  totalEuroAmplusPadToPayFirst?: number | string;
  totalRonAmplusPadToPayFirst?: number | string;
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
  firstPaymentValueConverted?: number;
  insurancePrice?: any;
  insurancePriceCurrency?: any;
  iban?: any;
}

export interface ExchangeRate {
  currencyFromCode: number;
  currencyFromDescription: string;
  currencyFromName: string;
  currencyToCode: number;
  currencyToDescription: string;
  currencyToName: string;
  exchangeRateForToCurrency: number;
  exchangedRateDateTime: Date;
  insertedExchangedRateDateTime: Date;
}
