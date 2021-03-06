import { TemplateRef } from '@angular/core';
import { has } from 'lodash';
import { Account } from 'src/app/core/models/account.interface';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { policyHeaderIcons } from './policy-header-icons';
import {
  dateHelperYear,
  dateHelperDMY,
} from 'src/app/core/helpers/date.helper';

export const offerItemHelper = (
  offer: PolicyOffer,
  account: Account,
  containerRefItem: TemplateRef<any>
): ImageCard => {
  const baseItem: ImageCard = {
    mainIcon: offer.policy.type.listingIcon,
    id: offer.id,
    // itemClass: 'mh-160 shadow-page-item white-overlay-gradient',
    itemClass: 'mh-160 shadow-page-item  light-green-gradient',
    // itemClass: 'mh-160 shadow-page-item dark-green-gradient',
    contentClass:
      'mt-0-reset ion-align-items-start ion-text-left pt-12 ' +
      'pr-16 flex flex-1 flex-column',
    textClass:
      'ion-align-items-start ion-text-left w-100 pl-8 pr-52 ' +
      'flex flex-1 flex-column ion-justify-content-center',
    textContent: [
      {
        classes: 'flex text-weight-bold ls-02 mb-4 color-white',
        text: offer.policy.type.shortDescription,
      },
      {
        classes: 'flex s24-h25 alt-font ls-min-02 color-white',
        text: offer.policy.type.name,
      },
    ],
    routerLink: '/policy/offer/' + offer.id,
    queryParams: { policyType: offer.policy.typeId },
  };
  baseItem.headerIcon = policyHeaderIcons.plus;
  if ( has( baseItem, 'mainIcon.classes' ) ) {
    baseItem.mainIcon.classes =
      baseItem.mainIcon.classes +
      ' ' +
      'position-absolute bottom-0 right-0 svg-absolute-right';
  }
  if ( containerRefItem ) {
    baseItem.contentRef = {
      item: containerRefItem,
      classes: 'flex flex-1 flex-column ion-justify-content-end w-100 pl-8',
      data: {
        leftButton: {
          classes: 'mb-8 mt-0 mx-0 no-shadow flat mr-16',
          text: 'Vezi oferta',
          size: 'small',
          shape: 'round',
          color: 'danger',
        },
        rightLabel: {
          text:
            'Expira la: ' + ( offer.expiry ? dateHelperDMY( offer.expiry ) : '' ),
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
