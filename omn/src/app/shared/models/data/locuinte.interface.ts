import { PolicyItem } from './policy-item';

enum TipLocuinta {
  MAIN,
  OTHER,
}

export enum LocuintaState {
  INVALID,
  INCOMPLETE,
  COMPLETE,
}

export interface Locuinte {
  id: number | string;
  name: string;
  addressCounty: string;
  addressCity: string;
  addressStreet?: string;
  addressName?: string;
  addressStreetType?: string;
  addressStreetNumber: string;
  // Scara bloc.
  addressScara: string;
  addressBuildingNumber: string;
  addressApart: string;
  addressPostalCode: string;

  type: string;
  structure: string;
  yearConstruction: number;
  valueCurrency: string;
  value: number;
  typeUse: string;
  area: number;
  floors: number;
  rooms: number;
  hasAlarmSystem: boolean;
  tipLocuinta?: TipLocuinta;
  policyData?: Array<PolicyItem>;

  // Additional data for fallbacks.
  addressCountyCode?: string;
  addressStreetCode?: string;
  addressCityCode?: string;

  // PAID data.
  paidExternalSeriePolita?: string;
  paidExternalNumarPolita?: string;
  PaidExternalDataPolita?: string | Date;
  paidExternalDataStartValabilitatePolita?: string | Date;
  paidExternalDataStopValabilitatePolita?: string | Date;
  // Temp - prefilled data.
  pad?: {
    padAvailable: boolean | number;
    padSerie: boolean | number;
    padNr: boolean | number;
  };
  locuintaState?: LocuintaState;
  isDisabled?: boolean;

  isHomeAddress?: boolean;
}
