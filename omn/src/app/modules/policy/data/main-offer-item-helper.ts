import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';

export const offerItemHelper = (offer: PolicyOffer) => {
  const baseItem = {
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
  if (offer) {
    // baseItem.id = offer.id;
    // baseItem.routerLink = '/policy/offer/' + offer.id;
    // if (offer.policy && offer.policy.type) {
    //   const t = offer.policy.type;
    //   baseItem.textContent.head.text = t.name ? t.name : '';
    //   baseItem.textContent.body.text = t.shortDescription
    //     ? t.shortDescription
    //     : '';
    // }
    // baseItem.textContent.footer.text = offer.expiry
    //   ? offer.expiry.toString()
    //   : '';
  }
  return baseItem;
};
