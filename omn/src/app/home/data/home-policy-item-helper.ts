import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { PolicyListItem } from 'src/app/shared/models/component/policy-list-item';
import { PolicyStates } from 'src/app/shared/models/data/policy-states';
import { IonIconItem } from 'src/app/shared/models/component/ion-icon-item';

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

export const policyHomeItemHelper = (policy: PolicyItem): PolicyListItem => {
  const baseItem: PolicyListItem = {
    id: null,
    routerLink: null,
    leftIcon: {
      name: 'md-acasa-light',
      color: 'success',
    },
    rightIcon: { ...chevronIcon },
    textContent: {
      head: {
        text: '',
      },
      body: {
        text: '',
        classes: 'mb-2',
      },
      footer: {
        text: '',
      },
    },
  };
  if (policy) {
    baseItem.id = policy.id;
    baseItem.routerLink = '/policy/' + policy.id;
    if (policy.type) {
      baseItem.textContent.head.text = policy.type.shortDescription
        ? policy.type.shortDescription
        : '';
      baseItem.textContent.body.text = policy.type.name ? policy.type.name : '';
    }
    baseItem.textContent.footer.text = policy.listingSubtitle
      ? policy.listingSubtitle
      : '';
    if (policy.state === PolicyStates.PAY) {
      baseItem.rightIcon = { ...payIcon };
    }
  }
  return baseItem;
};
