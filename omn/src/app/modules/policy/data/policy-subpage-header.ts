import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { get, has } from 'lodash';

export const policySubpageHeader = (conf: {
  title: string;
  classes?: string;
  hasTrailingIcon?: boolean;
  trailingLink?: any;
  backLink?: any;
}): SubPageHeader => {
  const item: SubPageHeader = {
    toolbarClasses: 'header-toolbar ' + get(conf, 'classes', ''),
    toolbarColor: 'omn-transparent-green',
    leadingIcon: {
      name: 'md-back',
      classes: 'icon-16 mt-2 omn-green',
      routerLink: get(conf, 'backLink', null),
    },
    title: {
      text: conf.title,
      classes: 'h2 alt-font omn-green header-title omn-green ion-text-center',
    },
  };
  if (get(conf, 'hasTrailingIcon', null)) {
    item.trailingIcon = {
      name: 'md-close-2',
      classes: 'icon-20 mt-2',
      routerLink: get(conf, 'trailingLink', null),
    };
  }
  console.log(item);
  return item;
};
