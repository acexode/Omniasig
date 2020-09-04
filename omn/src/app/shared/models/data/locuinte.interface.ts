import { PolicyItem } from './policy-item';

enum TipLocuinta {
  MAIN = 'Strada Traian 45, Brasov, judetul Brasov, Cod 321456',
  OTHER = 'Str. Traian Nr.45, Brasov, jud. BV, Cod 321456',
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
    valueSum: string;
    occupancy: string;
    usableSurface: number;
    heightRegime: number;
    rooms: number;
    hasAlarmSystem: boolean;
  };
  tipLocuinta: TipLocuinta;
  policyData: Array<PolicyItem>;

  // Temp - prefilled data.
  pad?: {
    padAvailable: boolean | number;
    padSerie: boolean | number;
    padNr: boolean | number;
  };
  locuintaState?: LocuintaState;
}
