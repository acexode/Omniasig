import { SubPageHeader } from '../models/component/sub-page-header';

export const subPageHeaderSecondary = (title: string): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: 'header-toolbar',
    toolbarColor: 'omn-transparent-green',
    title: {
      text: title,
      classes: 'h2 alt-font omn-green header-title omn-green ion-text-center',
    },
    trailingIcon: {
      name: 'close-outline',
      classes: 'icon-16 mt-2',
    },
  };
  return item;
};
