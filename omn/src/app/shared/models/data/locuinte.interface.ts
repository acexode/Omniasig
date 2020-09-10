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
  id: number;
  address: {
    name: string;
    addressCounty: string;
    addressCity: string;
    addressStreet: string;
    addressBuildingNumber: number;
    // Scara bloc.
    addressFloor: string;
    addressApart: string;
    addressPostalCode: string;
  };

  info: {
    type: string;
    structure: string;
    yearConstruction: number;
    valueCurrency: string;
    valueSum: number;
    occupancy: string;
    usableSurface: number;
    heightRegime: number;
    rooms: number;
    hasAlarmSystem: boolean;
  };
  tipLocuinta?: TipLocuinta;
  policyData?: Array<PolicyItem>;

  // Temp - prefilled data.
  pad?: {
    padAvailable: boolean | number;
    padSerie: boolean | number;
    padNr: boolean | number;
  };
  locuintaState?: LocuintaState;
  isDisabled?: boolean;
}
