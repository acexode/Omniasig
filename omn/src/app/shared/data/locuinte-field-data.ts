export enum LocuinteStructureType {
  BETON = 'beton',
  BETON_ARMAT = 'beton_armat',
  CARAMIDA = 'caramida',
  BCA = 'bca',
  LEMN = 'lemn',
  MIXTA = 'mixta',
  CARAMIDA_NEARSA = 'caramida_nearsa',
  MATERIALE_NETRATATE = 'materiale_netratate',
  CHIRPICI = 'chirpici',
}
export const locuinteFieldsData = {
  structure: [
    // {
    //   id: LocuinteStructureType.BETON,
    //   label: 'Beton',
    // },
    {
      id: LocuinteStructureType.BETON_ARMAT,
      label: 'Beton armat (cadre, diafragme, prefabricate)',
    },
    {
      id: LocuinteStructureType.CARAMIDA,
      label: 'Cărămidă',
    },
    {
      id: LocuinteStructureType.LEMN,
      label: 'Lemn',
    },
    // {
    //   id: LocuinteStructureType.BCA,
    //   label: 'BCA',
    // },
    // {
    //   id: LocuinteStructureType.MIXTA,
    //   label: 'Mixtă',
    // },
    // {
    //   id: LocuinteStructureType.CARAMIDA_NEARSA,
    //   label: 'Cărămidă nearsă',
    // },
    // {
    //   id: LocuinteStructureType.MATERIALE_NETRATATE,
    //   label: 'Materiale netratate',
    // },
    // {
    //   id: LocuinteStructureType.CHIRPICI,
    //   label: 'Chirpici/Paiantă',
    // },

    // Old stuff.
    // {
    //   id: LocuinteStructureType.ZIDARIE_PORTANTA,
    //   label: 'Zidărie portantă (zidarie, piatra)',
    // },
    //     {
    //   id: LocuinteStructureType.METAL,
    //   label: 'Metal',
    // },
    // {
    //   id: LocuinteStructureType.ZIDARIE_PORTANTA,
    //   label: 'Zidărie portantă (zidarie, piatra)',
    // },

    // {
    //   id: LocuinteStructureType.METAL,
    //   label: 'Metal',
    // },

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
  typeUse: [
    { id: 'permanent', label: 'Permanentă' },
    { id: 'temporar', label: 'Temporară' },
  ],
  hasAlarmSystem: [
    { id: true, label: 'Da' },
    { id: false, label: 'Nu' },
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
  addressStreetType: [
    { name: 'Alee' },
    { name: 'Bulevard' },
    { name: 'Cale' },
    { name: 'Camp' },
    { name: 'Canal' },
    { name: 'Canton' },
    { name: 'Cartier' },
    { name: 'Colonie' },
    { name: 'Curte' },
    { name: 'Cvartal' },
    { name: 'Drum' },
    { name: 'Fundac' },
    { name: 'Fundatura' },
    { name: 'Hotar' },
    { name: 'Intare' },
    { name: 'Parc' },
    { name: 'Pasaj' },
    { name: 'Piata' },
    { name: 'Piateta' },
    { name: 'Pietonal' },
    { name: 'Platou' },
    { name: 'Pod' },
    { name: 'Poligon' },
    { name: 'Poteca' },
    { name: 'Prelungire' },
    { name: 'Rampa' },
    { name: 'Scuar' },
    { name: 'Sir' },
    { name: 'Sosea' },
    { name: 'Splai' },
    { name: 'Statia' },
    { name: 'Strada' },
    { name: 'Stradela' },
    { name: 'Suis' },
    { name: 'Trecatoare' },
    { name: 'Ulita' },
    { name: 'Vad' },
    { name: 'Varianta' },
    { name: 'Zona' },
  ],
};
