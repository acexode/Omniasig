import { Account } from 'src/app/core/models/account.interface';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { PolicyType } from 'src/app/shared/models/data/policy-type';
import { has } from 'lodash';
import { policyHeaderIcons } from './policy-header-icons';

export const policySalesItemHelper = (
  policy: PolicyType,
  account: Account,
  containerRefItem = null
): ImageCard => {
  const baseItem: ImageCard = {
    mainIcon: policy.listingIcon,
    id: policy.id,
    routerLink: '/policy',
    itemClass: 'mh-160 shadow-page-item white-overlay-gradient',
    textClass:
      'flex-0 mt-0-reset ion-align-items-start ion-text-left pt-12 pl-16 pr-52 flex-column',
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
  baseItem.headerIcon = policyHeaderIcons.lock;
  if (has(baseItem, 'mainIcon.classes')) {
    baseItem.mainIcon.classes =
      baseItem.mainIcon.classes +
      ' ' +
      'position-absolute bottom-0 right-0 svg-absolute-right';
  }
  if (containerRefItem) {
    baseItem.contentRef = {
      item: containerRefItem,
      data: null,
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
