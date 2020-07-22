import { DntItemConfig } from '../models/dnt-item-config';

export const dntItemHelper = (): DntItemConfig => {
  const config: DntItemConfig = {
    top: {
      icon: {
        name: 'lg-casa-2',
        classes: 'mh-94',
      },
      content: [
        {
          text: 'PAD',
          color: 'omn-green',
        },
        {
          text: 'Polița de asigurare împotriva dezastrelor naturale',
          classes: 'text-normal',
        },
      ],
    },
    middle: {
      icon: {
        name: 'md-intrebari',
      },
    },
    content: [
      {
        text: 'Formular de analiză a cerinţelor şi necesităţilor clienţilor',
        classes: 'text-normal h3 alt-font text-weight-bold mb-16',
      },
      {
        text: 'Ai o locuință pe care vrei să o asiguri?',
        classes: 'text-normal mb-16 flex-1',
        color: 'omn-green',
      },
      {
        text:
          'Nu putem acorda consultanță prin intermediul aplicației. Dacă dorești consultanță, te rugăm să te adresezi unui reprezentant OMNIASIG.',
        classes: 'text-small color-tertiary-grey',
      },
    ],

    buttons: {
      start: {
        text: {
          text: 'Nu',
          classes: 'pr-8 pl-16',
        },
        icon: {
          name: 'md-close',
          classes: 'mx-n2',
          color: 'medium',
          slot: 'start',
        },
      },
      end: {
        color: 'omn-light-green',
        size: 'large',
        text: {
          text: 'Da',
          classes: 'pl-8 pr-16',
        },
        icon: {
          name: 'md-check',
          classes: 'mx-n2 mt-n1',
          slot: 'end',
        },
      },
    },
  };
  return config;
};
