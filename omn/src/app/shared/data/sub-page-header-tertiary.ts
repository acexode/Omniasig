import {
  SubPageHeader,
  TertiaryHeader,
} from '../models/component/sub-page-header';

export const subPageHeaderTertiary = (
  config: TertiaryHeader
): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: 'header-toolbar',
    toolbarColor: 'omn-transparent-green',
    title: {
      text: config.title,
      classes:
        'h2 alt-font omn-green header-title omn-green ion-text-center p-0 pl-0',
    },
    leadingIcon: {
      name: 'md-close-2',
      classes: config.leadingIconClasses,
    },
  };
  return item;
};
