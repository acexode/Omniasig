import { DisabledPlaceholderCard } from 'src/app/shared/models/component/disabled-placeholder-card';

export const testDauneData = [
  {
    mainIcon: {
      name: 'md-dosar',
      color: 'green-gradient',
      classes: 'mb-8 mt-16',
    },
    textContent: [
      {
        text: 'Dosar Nr. 123456',
      },
      {
        text: 'Lorem Ipsum',
      },
    ],
    id: '0',
    routerLink: '/home',
    itemClass: 'mh-104',
  },
];

export const addDaune = {
  mainIcon: {
    name: 'md-plus-ling',
    color: 'green-gradient',
    classes: 'icon-32 mt-20 mb-8',
  },
  textContent: [
    {
      text: 'Deschide dosar',
    },
  ],
  id: '0',
  routerLink: '/home',
  itemClass: 'mh-104',
};

export const dauneDisabled: DisabledPlaceholderCard = {
  leftColumnClass: 'mw-120',
  rightColumnClass: 'pl-16 pr-0 py-16',
  cards: [
    {
      mainIcon: {
        name: 'md-plus-ling',
        color: 'omn-medium',
        classes: 'icon-32 mt-20 mb-8 mx-auto',
      },
      headerIcon: {
        name: 'md-lock-light',
        color: 'omn-disabled-icon',
        classes:
          'icon-20 px-10 py-8 position-absolute right-0 top-0 bottom-left-radius-8',
      },
      textContent: [
        {
          text: 'Deschide dosar',
        },
      ],
      id: '0',
      itemClass: 'mh-104 flex-0 mt-n16 mb-16',
    },
  ],
  textContent: [
    {
      text: 'Activează-ți contul ca să poți deschide un dosar de daună.',
    },
  ],
  id: null,
  routerLink: null,
  itemClass: null,
  color: null,
};
