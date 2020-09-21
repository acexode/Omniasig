import { SubPageHeader } from '../models/component/sub-page-header';

export const subPageHeaderTertiary = (title: string): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: 'header-toolbar',
    toolbarColor: 'omn-transparent-green',
    title: {
      text: title,
      classes:
        'h2 alt-font omn-green header-title omn-green ion-text-center p-0 pl-0',
    },
    leadingIcon: {
      name: 'md-close-2',
      classes: 'icon-20 mt-2 p-8',
    },
  };
  return item;
};
