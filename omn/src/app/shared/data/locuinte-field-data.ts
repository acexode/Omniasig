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
    { id: 'Brasov', label: 'Brasov' },
    { id: 'Bacau', label: 'Bacau' },
    { id: 'Bucuresti', label: 'Bucuresti' },
  ],
  city: [
    { id: 'Brasov', label: 'Brasov' },
    { id: 'Bacau', label: 'Bacau' },
    { id: 'Bucuresti', label: 'Bucuresti' },
  ],
  street: [
    { id: 'Republicii', label: 'Republicii' },
    { id: 'Traian', label: 'Traian' },
    { id: 'test3', label: 'test2 test2' },
    { id: 'test4', label: 'test3 test3' },
    { id: 'test5', label: 'test4 test3' },
  ],
};
