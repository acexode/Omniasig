import {
  exclusionItemHelper,
  exclusionContentButtons,
  exclusionCancelItem,
  exclusionCancelBtn,
} from './../../data/exclusion-item-helper';
import { PolicyType } from 'src/app/shared/models/data/policy-type';
import {
  dntCancelBtn,
  dntContentButtons,
  dntContentText,
  dntItemHelper,
  dntSuccessButton,
  dntTopTexts,
  dntAltText,
} from '../../modules/dnt/data/dnt-item-helper';

export const policyTypes: { [key: string]: PolicyType } = {
  AMPLUS: {
    order: 0,
    id: 'AMPLUS',
    name: 'Garant AMPLUS',
    shortDescription: 'Asigurarea facultativă a locuințelor',
    listingIcon: {
      name: 'lg-casa-1',
      classes: 'mh-100  mw-188',
    },
  },
  AMPLUS_PAD: {
    order: 1,
    id: 'Garant AMPLUS+ PAD',
    name: 'Pachet asigurare obligatorie + facultativă',
    shortDescription: 'Garant AMPLUS + PAD',
    listingIcon: {
      name: 'lg-casa-3',
      classes: 'mh-100  mw-188',
    },
  },
  PAD: {
    id: 'PAD',
    order: 2,
    name: 'PAD - Polița de asigurare obligatorie',
    shortDescription: 'Asigurarea obligatorie a locuințelor',
    dntConfig: {
      success: dntItemHelper({
        topIcon: {
          name: 'lg-casa-2',
          classes: 'mh-94',
        },
        topText: dntTopTexts(
          'PAD',
          'Polița de asigurare împotriva dezastrelor naturale'
        ),
        buttons: dntSuccessButton(),
        textContent: dntAltText(
          'Soluție financiară propusă',
          'Îți propunem Asigurarea obligatorie a locuinței – PAD',
          'Nu putem acorda consultanță prin intermediul aplicației. Dacă dorești consultanță, te rugăm să te adresezi unui reprezentant OMNIASIG.'
        ),
      }),
      cancel: dntItemHelper({
        topIcon: {
          name: 'lg-casa-2',
          classes: 'mh-94',
        },
        topText: dntTopTexts(
          'PAD',
          'Polița de asigurare împotriva dezastrelor naturale'
        ),
        buttons: dntCancelBtn(),
        textContent: dntAltText(
          'Formular de analiză a cerinţelor şi necesităţilor clienţilor',
          'Ne pare rău dar nu poți cumpăra acest produs de asigurare dacă nu ești interesat de ceea ce oferă.'
        ),
      }),
      items: [
        dntItemHelper({
          topIcon: {
            name: 'lg-casa-2',
            classes: 'mh-94',
          },
          topText: dntTopTexts(
            'PAD',
            'Polița de asigurare împotriva dezastrelor naturale'
          ),
          buttons: dntContentButtons,
          textContent: dntContentText(
            'Formular de analiză a cerinţelor şi necesităţilor clienţilor',
            'Ai o locuință pe care vrei să o asiguri?',
            'Nu putem acorda consultanță prin intermediul aplicației. Dacă dorești consultanță, te rugăm să te adresezi unui reprezentant OMNIASIG.'
          ),
        }),
      ],
    },
    exclusionConfig: {
      items: [
        {
          content: exclusionItemHelper({
            text: {
              text:
                'Locuința pe care dorești să o asiguri se află într-o clădire ' +
                'expertizată tehnic și încadrată în clasa I-a de risc seismic? ',
            },
            icon: {
              name: 'lg-exclusion-6',
              classes: 'maxh-200 flex w-100 h-100 maxw-280',
            },
          }),
          buttons: exclusionContentButtons,
        },
      ],
      cancel: {
        content: exclusionCancelItem(),
        buttons: exclusionCancelBtn(),
      },
    },
    listingIcon: {
      name: 'lg-casa-2',
      classes: 'mh-100  mw-188',
    },
  },
};

export const PolicyText = [
  `Plan de asigurare prestabilit pentru care alegi suma cu care vrei să îți asiguri locuința și bunurile.În plus, include și secțiunea de răspundere civilă față de terți și servicii de asistență tehnică la domiciliu.`,
  `Descriere, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem.`,
  `Baza de pornire pentru asigurarea corespunzătoare a locuinței împreună cu produsele facultative.`,
];
