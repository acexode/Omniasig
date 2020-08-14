import { get, set } from 'lodash';
import { IonButtonItem } from './../models/component/ion-button-item';
import { IonIconItem } from './../models/component/ion-icon-item';
import { IonTextItem } from './../models/component/ion-text-item';

export type ExclusionItemType = 'icon' | 'text' | 'button';

export const exclusionItemHelper = (item: {
  text: IonTextItem;
  icon: IonIconItem;
}): Array<{
  type: 'icon' | 'text' | 'button';
  item: IonTextItem | IonIconItem | IonButtonItem;
  itemClasses?: string;
}> => {
  const items = [];

  const itT = {
    type: 'text',
    item: {
      classes:
        'h3 ion-text-center text-normal alt-font mb-16 ' +
        get(item.text, 'classes', ''),
      text: item.text.text,
    },
  };
  items.push(itT);
  const itI = {
    type: 'icon',
    item: {
      name: item.icon.name,
      color: get(item.icon, 'color', null),
      classes: get(item.icon, 'classes', '') + ' mt-auto',
    },
    itemClasses: 'flex-column ion-align-items-end flex-1',
  };
  items.push(itI);

  return items;
};

export const exclusionContentButtons = {
  classes: 'ion-justify-content-between',
  start: {
    classes: 'no-shadow',
    text: {
      text: 'Da',
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
      text: 'Nu',
      classes: 'pl-8 pr-16 s18-h24',
    },
    icon: {
      name: 'md-check',
      classes: 'mx-n2 mt-n1',
      slot: 'end',
    },
  },
};

export const exclusionCancelBtn = (text = 'Închide') => {
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

export const exclusionCancelItem = (): Array<{
  type: 'icon' | 'text' | 'button';
  item: IonTextItem | IonIconItem | IonButtonItem;
}> => {
  const rItems = [
    {
      type: 'text' as ExclusionItemType,
      item: {
        color: 'omn-green',
        text:
          'Ne pare rău, însă locuința ta nu poate fi asigurată prin intermediul aplicației.',
        classes:
          'ion-text-center alt-font h3 text-weight-normal mb-24 ls-min-02 s20-h24',
      },
    },
    {
      type: 'text' as ExclusionItemType,
      item: {
        color: 'omn-green',
        text: 'Te rugăm să apelezi',
        classes:
          'ion-text-center alt-font h3 text-weight-normal mb-0 ls-min-02 s20-h24',
      },
    },
    {
      type: 'text' as ExclusionItemType,
      item: {
        color: 'omn-green',
        text: 'Call Center OMNIASIG',
        classes:
          'ion-text-center alt-font h3 text-weight-normal mb-40 ls-min-02 s20-h24',
      },
    },
    {
      type: 'button' as ExclusionItemType,
      item: {
        color: 'success',
        text: '021.9669',
        href: 'tel:021.9669',
        size: 'large',
        fill: 'solid',
        expand: 'block',
        classes:
          'ion-text-center h3 text-weight-medium' + ' mb-16 ls-min-02 h3 w-100',
      },
    },
    {
      type: 'text' as ExclusionItemType,
      item: {
        text: 'Disponibil în intervalul orar',
        classes:
          'ion-text-center text-normal text-weight-normal mb-0 ls-min-01 color-tertiary-grey',
      },
    },
    {
      type: 'text' as ExclusionItemType,
      item: {
        text: '08:00-20:00 (Luni-Sâmbătă)',
        classes:
          'ion-text-center text-normal text-weight-normal mb-0 ls-min-01 color-tertiary-grey',
      },
    },
    {
      type: 'text' as ExclusionItemType,
      item: {
        text: 'și 09:00-17:30 (Duminică)',
        classes:
          'ion-text-center text-normal text-weight-normal mb-22 ls-min-01 color-tertiary-grey',
      },
    },
    {
      type: 'text' as ExclusionItemType,
      item: {
        text:
          'Apelurile către numărul scurt 021.9669 sunt taxate conform tarifelor în vigoare.',
        classes:
          'ion-text-center text-normal text-weight-normal mb-0 ls-min-01 color-tertiary-grey',
      },
    },
  ];

  return rItems;
};
