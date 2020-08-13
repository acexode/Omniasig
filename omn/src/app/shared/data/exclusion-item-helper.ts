import { get } from 'lodash';
import { IonIconItem } from '../models/component/ion-icon-item';
import { IonTextItem } from '../models/component/ion-text-item';

export const exclusionItemHelper = (item: {
  text: IonTextItem;
  icon: IonIconItem;
}): Array<{
  type: 'icon' | 'text';
  item: IonTextItem | IonIconItem;
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
      classes: get(item.icon, 'classes', '') + ' ion-align-flex-end',
    },
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
