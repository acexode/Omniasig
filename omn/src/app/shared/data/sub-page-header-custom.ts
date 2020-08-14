import { SubPageHeader } from '../models/component/sub-page-header';

export const subPageHeaderCustom = (title: string,classes?:string): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: `header-toolbar ${classes}`,
    toolbarColor: 'omn-transparent-green',
    leadingIcon: {
      name: 'md-back',
      classes: 'icon-16 mt-2 omn-green',
    },
    trailingIcon: {
      name: 'md-close-2',
      classes: 'icon-20 mt-2',
    },
    title: {
      text: title,
      classes: 'h2 alt-font omn-green header-title omn-green ion-text-center',
    },
  };
  return item;
};
