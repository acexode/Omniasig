import { SubPageHeader } from '../models/component/sub-page-header';

export const subPageHeaderPrimary = ( title: string, toRouteTolink: string = '' ): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: 'header-toolbar',
    toolbarColor: 'omn-transparent-green',
    leadingIcon: {
      name: 'md-back',
      classes: 'icon-16 mt-2 omn-green',
      routerLink: toRouteTolink ?? null,
    },
    title: {
      text: title,
      classes: 'h2 alt-font omn-green header-title omn-green ion-text-center',
    },
    trailingIcon: {
      name: 'md-close-2',
      classes: 'icon-20 mt-2 p-8', // icon-16 to icon-20 to make it more clickable
    },
  };
  return item;
};
