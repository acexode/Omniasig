import { DntItemConfig } from '../models/dnt-item-config';

export const dntItemHelper = (): DntItemConfig => {
  const config: DntItemConfig = {
    top: {
      icon: {
        name: 'lg-casa-2',
        classes: 'py-16',
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
        classes: 'icon-20',
      },
    },
    content: [
      {
        text: 'Formular de analiză a cerinţelor şi necesităţilor clienţilor',
        classes: 'text-normal h3 alt-font text-weight-bold',
      },
      {
        text: 'Ai o locuință pe care vrei să o asiguri?',
        classes: 'text-normal',
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
        color: 'omn-light-green button-large no-shadow',
        text: {
          text: 'Nu',
          classes: 's18-h24 text-weight-medium pr-8 pl-16 ls-0',
        },
        icon: {
          name: 'md-close',
          classes: 'icon-20 mx-n2',
          color: 'medium',
          slot: 'start',
        },
        classes: 'm-0',
      },
      end: {
        color: 'omn-light-green button-large no-shadow',

        text: {
          text: 'Da',
          classes: 's18-h24 text-weight-medium pl-8 pr-16 ls-0',
        },
        icon: {
          name: 'md-check',
          classes: 'icon-20 mx-n2',
          color: 'medium',
          slot: 'end',
        },
        classes: 'm-0',
      },
    },
  };
  return config;
};
