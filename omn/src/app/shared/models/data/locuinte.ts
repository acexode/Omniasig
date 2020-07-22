export interface Locuinte {
  name: string;
  address: {
    county: string;
    city: string;
    street: string;
    number: number;
    // Scara bloc.
    entrance: string;
  };

  info: {
    type: string;
    resistenceStructure: string;
    buildYear: number;
    value: {
      currency: string;
      sum: string;
    };
    occupancy: string;
    usablesurface: number;
    heightRegime: number;
    roomCount: number;
    alarm: boolean;
  };
}
