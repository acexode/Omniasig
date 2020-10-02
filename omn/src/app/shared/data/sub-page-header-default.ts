import { SubPageHeader } from '../models/component/sub-page-header';

export const subPageHeaderDefault = ( title: string, toRouteTolink: string = '' ): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: 'header-toolbar',
    toolbarColor: 'omn-transparent-green',
    leadingIcon: {
      name: 'md-back',
      classes: 'icon-16 mt-2 omn-green',
      routerLink: toRouteTolink !== '' ? toRouteTolink : null
    },
    title: {
      text: title,
      classes: 'h2 alt-font omn-green header-title omn-green ion-text-center',
    },
  };
  return item;
};
