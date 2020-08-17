import { SubPageHeader } from '../models/component/sub-page-header';

export const subPageHeaderPrimary = (title: string): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: 'header-toolbar',
    toolbarColor: 'omn-transparent-green',
    leadingIcon: {
      name: 'md-back',
      classes: 'icon-16 mt-2 omn-green',
    },
    title: {
      text: title,
      classes: 'h2 alt-font omn-green header-title omn-green ion-text-center',
    },
    trailingIcon: {
      name: 'md-close-2',
      classes: 'icon-16 mt-2',
    },
  };
  return item;
};
