import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';

export const offerHomeItemHelper = ( offer: PolicyOffer ) => {
  const baseItem = {
    id: null,
    routerLink: null,
    queryParams: null,
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
        textA: '',
        prefix: 'Expira la: ',
        text: '',
      },
    },
  };
  if ( offer ) {
    console.log( offer );
    baseItem.id = offer.id;
    baseItem.routerLink = '/policy/offer/' + offer.id;
    baseItem.queryParams = { policyType: offer.policy.typeId };
    if ( offer.policy && offer.policy.type ) {
      const t = offer.policy.type;
      baseItem.textContent.head.text = t.name ? t.name : '';
      baseItem.textContent.body.text = t.shortDescription
        ? t.shortDescription
        : '';
    }
    baseItem.textContent.footer.text = offer.expiry
      ? offer.expiry
        ? dateHelperDMY( offer.expiry )
        : ''
      : '';
    baseItem.textContent.footer.text = offer.supportData
      ? offer.supportData === 'GOLD'
        ? 'Plan: GOLD ● plata integrală ● 450,8 lei/an'
        : offer.supportData === 'VIP'
          ? 'Plan: VIP ● plata în două rate ● 540,3 lei/an'
          : ''
      : '';
  }
  return baseItem;
};
