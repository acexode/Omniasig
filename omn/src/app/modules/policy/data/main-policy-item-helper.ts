import { TemplateRef } from '@angular/core';
import { has } from 'lodash';
import { Account } from 'src/app/core/models/account.interface';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { policyHeaderIcons } from './policy-header-icons';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';

export const policyItemHelper = (
  policy: PolicyItem,
  account: Account,
  containerRefItem: TemplateRef<any>
): ImageCard => {
  const baseItem: ImageCard = {
    mainIcon: policy.type.listingIcon,
    id: policy.id,
    // itemClass: 'mh-160 shadow-page-item white-overlay-gradient',
    // itemClass: 'mh-160 shadow-page-item  light-green-gradient',
    itemClass: 'mh-160 shadow-page-item dark-green-gradient',
    contentClass:
      'mt-0-reset ion-align-items-start ion-text-left pt-12 ' +
      'pr-16 flex flex-1 flex-column',
    textClass:
      'ion-align-items-start ion-text-left w-100 pl-8 pr-52 ' +
      'flex flex-1 flex-column ion-justify-content-center',
    textContent: [
      {
        classes: 'flex text-weight-bold ls-02 mb-4 color-white',
        text: policy.type.shortDescription,
      },
      {
        classes: 'flex s24-h25 alt-font ls-min-02 color-white',
        text: policy.type.name,
      },
    ],
  };
  baseItem.headerIcon = policyHeaderIcons.check;
  if (has(baseItem, 'mainIcon.classes')) {
    baseItem.mainIcon.classes =
      baseItem.mainIcon.classes +
      ' ' +
      'position-absolute bottom-0 right-0 svg-absolute-right';
  }
  if (policy) {
    baseItem.routerLink = ['/policy', policy.id];
  }
  if (containerRefItem) {
    baseItem.contentRef = {
      item: containerRefItem,
      classes: 'flex flex-1 flex-column ion-justify-content-end w-100 pl-8',
      data: {
        leftButton: {
          classes: 'mb-8 mt-0 mx-0 no-shadow flat mr-16',
          text: 'Vezi polita',
          size: 'small',
          shape: 'round',
          color: 'danger',
        },
        rightLabel: {
          text: policy.dates
            ? dateHelperDMY(policy.dates.from) +
              '-' +
              dateHelperDMY(policy.dates.to)
            : '',
          classes:
            'flex ion-align-items-end ion-justify-content-end ' +
            'mr-n16 pl-8 pr-16 text-small bg-green-08 color-white ' +
            'ls-m-02 py-4 font-weight-medium',
        },
      },
    };
  }
  return baseItem;
};

export const policyEmptyItemHelper = (): ImageCard => {
  const baseItem: ImageCard = {
    mainIcon: {
      name: 'lg-nori',
      classes: 'mh-42 mw-90 pt-32 pb-32',
    },
    id: null,
    itemClass: 'mh-144',
    textContent: [
      {
        classes: 'text-normal pb-16 text-weight-normal',
        text: 'Nu ai nici o poliță de asigurare.',
      },
    ],
  };
  return baseItem;
};
