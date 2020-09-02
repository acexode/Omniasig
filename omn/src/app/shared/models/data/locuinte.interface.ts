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
    locationName: string;
    county: string;
    city: string;
    street: string;
    buildingNumber: number;
    // Scara bloc.
    floor: string;
    apart: string;
    postalCode: string;
  };

  info: {
    type: string;
    resistenceStructure: string;
    buildYear: number;
    valueCurrency: string;
    valueSum: string;
    occupancy: string;
    usableSurface: number;
    heightRegime: number;
    roomCount: number;
    alarm: boolean;
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
