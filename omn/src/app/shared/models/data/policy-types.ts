import { PolicyType } from 'src/app/shared/models/data/policy-type';

export const policyTypes: { [key: string]: PolicyType } = {
  PAD: {
    id: 'PAD',
    name: 'PAD - Polița de asigurare obligatorie',
    shortDescription: 'Asigurarea obligatorie a locuințelor',
  },
  AMPLUS: {
    id: 'AMPLUS',
    name: 'Garant AMPLUS',
    shortDescription: 'Asigurarea facultativă a locuințelor',
  },
  AMPLUS_PAD: {
    id: 'Garant AMPLUS+ PAD',
    name: 'Pachet asigurare obligatorie + facultativă',
    shortDescription: 'Garant AMPLUS + PAD',
  },
};
