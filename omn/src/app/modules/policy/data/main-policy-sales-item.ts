import { ImageCard } from 'src/app/shared/models/component/image-card';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { get } from 'lodash';
import { PolicyType } from 'src/app/shared/models/data/policy-type';
import { Account } from 'src/app/core/models/account.interface';

export const policySalesItemHelper = (
  policy: PolicyType,
  account: Account
): ImageCard => {
  const baseItem: ImageCard = {
    mainIcon: {
      name: 'md-dosar',
      color: 'green-gradient',
      classes: 'mb-8 mt-16',
    },

    id: '0',
    routerLink: '/policy',
    itemClass: 'mh-160',
  };
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
