import { PolicyItem } from './policy-item';

enum TipLocuinta {
  MAIN = 'Strada Traian 45, Brasov, judetul Brasov, Cod 321456',
  OTHER = 'Str. Traian Nr.45, Brasov, jud. BV, Cod 321456',
}

export interface Locuinte {
  id: number;
  name: string;
  address: {
    county: string;
    city: string;
    street: string;
    number: number;
    // Scara bloc.
    entrance: string;
    apartment: string;
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
}
