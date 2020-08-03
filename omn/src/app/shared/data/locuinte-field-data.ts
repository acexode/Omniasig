export enum LocuinteStructureType {
  BETON_ARMAT,
  ZIDARIE_PORTANTA,
  METAL,
  LEMN,
}
export const locuinteFieldsData = {
  resistenceStructure: [
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
  alarm: [
    { id: 1, label: 'Da' },
    { id: 0, label: 'Nu' },
  ],
  type: [
    { id: 'casaVila', label: 'Casă / vilă' },
    { id: 'apartament', label: 'Apartament' },
  ],
  county: [
    { id: 1, label: 'test1' },
    { id: 0, label: 'test2' },
  ],
  city: [
    { id: 1, label: 'test1' },
    { id: 0, label: 'test2' },
    { id: 2, label: 'test3' },
  ],
  street: [
    { id: 1, label: 'test1' },
    { id: 0, label: 'test2' },
  ],
};
