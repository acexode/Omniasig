export enum LocuinteStructureType {
  BETON_ARMAT = 'beton',
  ZIDARIE_PORTANTA = 'zidarie',
  METAL = 'metal',
  LEMN = 'lemn',
}
export const locuinteFieldsData = {
  structure: [
    {
      id: LocuinteStructureType.BETON_ARMAT,
      label: 'Beton armat (cadre, diafragme, prefabricate)',
    },
    {
      id: LocuinteStructureType.ZIDARIE_PORTANTA,
      label: 'Zidărie portantă (zidarie, piatra)',
    },

    {
      id: LocuinteStructureType.METAL,
      label: 'Metal',
    },
    {
      id: LocuinteStructureType.LEMN,
      label: 'Lemn',
    },
    // {
    //   id: 'lemnSub60',
    //   label: 'Lemn, sub 60%',
    // },
    // {
    //   id: 'lemnPeste60',
    //   label: 'Lemn, peste 60%',
    // },
    // {
    //   id: 'chirpiciPaianta',
    //   label: 'Chirpici/Paiantă',
    // },
  ],
  valueCurrency: [
    { id: 'EUR', label: 'Euro' },
    { id: 'RON', label: 'Lei' },
  ],
  occupancy: [
    { id: 'permanent', label: 'Permanentă' },
    { id: 'temporar', label: 'Temporară' },
  ],
  hasAlarmSystem: [
    { id: 1, label: 'Da' },
    { id: 0, label: 'Nu' },
  ],
  type: [
    { id: 'casaVila', label: 'Casă / vilă' },
    { id: 'apartament', label: 'Apartament' },
    { id: 'bloc', label: 'Bloc' },
  ],
  county: [],
  city: [],
  street: [],
  padAvailable: [
    { id: 1, label: 'Da' },
    { id: 0, label: 'Nu' },
  ],
};
