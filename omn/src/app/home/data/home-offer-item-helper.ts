import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';

export const offerHomeItemHelper = (offer: PolicyOffer) => {
  const baseItem = {
    id: null,
    routerLink: null,
    leftIcon: {
      name: 'md-acasa-light',
      color: 'success',
    },
    rightIcon: null,
    textContent: {
      head: {
        text: '',
      },
      body: {
        text: '',
        classes: 'mb-2',
      },
      footer: {
        prefix: 'Expira la: ',
        text: '',
      },
    },
  };
  if (offer) {
    baseItem.id = offer.id;
    baseItem.routerLink = '/policy/offer/' + offer.id;
    if (offer.policy && offer.policy.type) {
      const t = offer.policy.type;
      baseItem.textContent.head.text = t.shortDescription
        ? t.shortDescription
        : '';
      baseItem.textContent.body.text = t.name ? t.name : '';
    }
    baseItem.textContent.footer.text = offer.expiry
      ? offer.expiry.toString()
      : '';
  }
  return baseItem;
};
