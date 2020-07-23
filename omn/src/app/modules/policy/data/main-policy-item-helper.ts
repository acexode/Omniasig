import { ImageCard } from 'src/app/shared/models/component/image-card';
import { IonIconItem } from 'src/app/shared/models/component/ion-icon-item';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';

const payIcon: IonIconItem = {
  name: 'md-plata-light',
  color: 'danger',
  classes: 'pay',
};
const chevronIcon = {
  name: 'md-chevron-right',
  color: 'success',
  classes: 'chevron mr-2 icon-16',
};

export const policyItemHelper = (policy: PolicyItem): ImageCard => {
  const baseItem: ImageCard = {
    mainIcon: {
      name: 'md-dosar',
      color: 'green-gradient',
      classes: 'mb-8 mt-16',
    },
    textContent: [
      {
        text: 'Dosar Nr. 123456',
      },
      {
        text: 'Lorem Ipsum',
      },
    ],
    id: '0',
    routerLink: '/home',
    itemClass: 'mh-104',
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
