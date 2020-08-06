import { TemplateRef } from '@angular/core';
import { has } from 'lodash';
import { Account } from 'src/app/core/models/account.interface';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { PolicyType } from 'src/app/shared/models/data/policy-type';
import { policyHeaderIcons } from './policy-header-icons';

export const policySalesItemHelper = (
  policy: PolicyType,
  account: Account,
  accountActivated: boolean,
  containerRefItem: TemplateRef<any>
): ImageCard => {
  const baseItem: ImageCard = {
    mainIcon: policy.listingIcon,
    id: policy.id,
    itemClass: 'mh-160 shadow-page-item white-overlay-gradient',
    // itemClass: 'mh-160 shadow-page-item  light-green-gradient',
    // itemClass: 'mh-160 shadow-page-item dark-green-gradient',
    contentClass:
      'mt-0-reset ion-align-items-start ion-text-left pt-12 ' +
      'pr-16 flex flex-1 flex-column',
    textClass:
      'ion-align-items-start ion-text-left w-100 pl-8 pr-52 ' +
      'flex flex-1 flex-column ion-justify-content-center',
    textContent: [
      {
        classes: 'flex text-weight-bold ls-02 mb-4',
        text: policy.shortDescription,
      },
      {
        classes: 'flex s24-h25 alt-font ls-min-02',
        text: policy.name,
        color: 'omn-green',
      },
    ],
  };
  baseItem.headerIcon = accountActivated
    ? {
        ...policyHeaderIcons.plus,
        ...{ color: 'white-light-green-2-bg' },
      }
    : policyHeaderIcons.lock;
  if (has(baseItem, 'mainIcon.classes')) {
    baseItem.mainIcon.classes =
      baseItem.mainIcon.classes +
      ' ' +
      'position-absolute bottom-0 right-0 svg-absolute-right';
  }
  if (containerRefItem) {
    baseItem.contentRef = {
      item: containerRefItem,
      classes: 'flex flex-1 flex-column ion-justify-content-end w-100 pl-8',
      data: {
        leftButton: {
          classes: 'mb-8 mt-0 mx-0 no-shadow flat mr-16',
          text: 'Vezi produsul',
          size: 'small',
          shape: 'round',
          color: 'danger',
        },
        // rightLabel: {
        //   text: '12.07.2020 - 12.07.2021',
        //   classes:
        //     'flex ion-align-items-end ion-justify-content-end ' +
        //     'mr-n16 pl-8 pr-16 text-small bg-green-08 color-white ' +
        //     'ls-m-02 py-4 font-weight-medium',
        // },
      },
    };
  }
  if (policy) {
    // baseItem.id = policy.id;
    // baseItem.routerLink = '/policy/' + policy.id;
    // if (policy.type) {
    //   baseItem.textContent.head.text = policy.type.name ? policy.type.name : '';
    //   baseItem.textContent.body.text = policy.type.shortDescription
    //     ? policy.type.shortDescription
    //     : '';
    // }
    // baseItem.textContent.footer.text = policy.listingSubtitle
    //   ? policy.listingSubtitle
    //   : '';
    // if (policy.state === PolicyStates.PAY) {
    //   baseItem.rightIcon = { ...payIcon };
    // }
  }
  return baseItem;
};
