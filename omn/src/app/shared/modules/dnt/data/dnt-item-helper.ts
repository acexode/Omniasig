import { DntItemConfig } from '../models/dnt-item-config';
import { IonIconItem } from 'src/app/shared/models/component/ion-icon-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

export const dntItemHelper = (
  conf: {
    topIcon: IonIconItem;
    topText: Array<IonTextItem>;
    buttons: any;
    textContent: Array<IonTextItem>;
  } = {
    topIcon: null,
    topText: [],
    buttons: null,
    textContent: [],
  }
): DntItemConfig => {
  const config: DntItemConfig = {
    top: {
      icon: conf.topIcon,
      content: conf.topText,
    },
    middle: {
      icon: {
        name: 'md-intrebari',
      },
    },
    content: conf.textContent,
    buttons: conf.buttons,
  };
  return config;
};

export const dntTopTexts = (title1, title2) => {
  return [
    {
      text: title1,
      color: 'omn-green',
    },
    {
      text: title2,
      classes: 'text-normal',
    },
  ];
};

export const dntContentText = (title, content, disclaimer = '') => {
  return [
    {
      text: title,
      classes: 'text-normal h3 alt-font text-weight-bold mb-16',
    },
    {
      text: content,
      classes: 'text-normal mb-16 flex-1',
      color: 'omn-green',
    },
    {
      text: disclaimer,
      classes: 'text-small color-tertiary-grey',
    },
  ];
};
export const dntAltText = (
  title,
  content,
  disclaimer = '',
  centerLink = ''
) => {
  return [
    {
      text: title,
      classes: 'text-normal h3 alt-font text-weight-bold mb-16',
    },
    {
      text: content,
      classes: 'text-normal mb-16',
    },
    {
      text: centerLink,
      classes: 'text-normal mt-24 mb-16 flex-1',
    },
    {
      text: disclaimer,
      classes: 'text-small color-tertiary-grey',
    },
  ];
};

export const dntSuccessButton = (text = 'Continuă') => {
  return {
    classes: 'ion-justify-content-center w-100',
    start: {
      color: 'success',
      classes: 'w-100',
      text: {
        text,
        classes: 'w-100',
      },
      data: 'success-btn',
    },
  };
};
export const dntCancelBtn = (text = 'Închide') => {
  return {
    classes: 'ion-justify-content-center w-100',
    start: {
      classes: 'ion-justify-content-center no-shadow  mb-n14',
      color: 'transparent',
      text: {
        text,
        classes: 'color-dark-green text-normal text-weight-normal',
      },
      data: 'cancel-btn',
    },
  };
};

export const dntContentButtons = {
  classes: 'ion-justify-content-between',
  start: {
    classes: 'no-shadow',
    text: {
      text: 'Nu',
      classes: 'pr-8 pl-16 s18-h24',
    },
    icon: {
      name: 'md-close',
      classes: 'mx-n2',
      color: 'medium',
      slot: 'start',
    },
  },
  end: {
    classes: ' no-shadow',
    text: {
      text: 'Da',
      classes: 'pl-8 pr-16 s18-h24',
    },
    icon: {
      name: 'md-check',
      classes: 'mx-n2 mt-n1',
      slot: 'end',
    },
  },
};
