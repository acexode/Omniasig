import { replaceHelper } from 'src/app/core/helpers/basic.helpers';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';

export const offerHomeItemHelper = (offer: PolicyOffer) => {
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
        additionalText: '',
        // prefix: 'Expira la: ',
        text: '',
      },
    },
  };
  if (offer) {
    baseItem.id = offer.id;
    baseItem.routerLink = '/policy/offer/' + offer.id;
    baseItem.queryParams = { policyType: offer.policy.typeId };
    if (offer.policy && offer.policy.type) {
      const t = offer.policy.type;
      baseItem.textContent.head.text = t.name ? t.name : '';
      baseItem.textContent.body.text = 'Oferta ' + offer?.offerCode;
    }
    baseItem.textContent.footer.additionalText = offer.expiry
      ? offer.expiry
        ? 'Expiră la: ' + dateHelperDMY(offer.expiry)
        : ''
      : '';
    baseItem.textContent.footer.text =
      (offer.policy.typeId === 'AMPLUS' || 'AMPLUS_PAD') &&
      offer.supportData &&
      offer.offerPrice
        ? offer.supportData === 'GOLD'
          ? 'Plan: GOLD ● ' +
            plataOption(
              offer.noOfPayments,
              offer?.currencyUserSelectedToPayIn === 'RON'
                ? offer?.totalRon
                : offer?.totalEur,
              offer.currencyUserSelectedToPayIn
            )
          : offer.supportData === 'VIP'
          ? 'Plan: VIP ● ' +
            plataOption(
              offer.noOfPayments,
              offer?.currencyUserSelectedToPayIn === 'RON'
                ? offer?.totalRon
                : offer?.totalEur,
              offer.currencyUserSelectedToPayIn
            )
          : ''
        : replaceHelper(offer.offerPrice, '.', ',') +
          currencyCheck(offer.currency);
  }
  return baseItem;
};

const plataOption = (noOfPayments: number, offerPrice: any, currency) => {
  return noOfPayments !== 0
    ? noOfPayments === 1
      ? 'plata integrală' +
        ' ● ' +
        replaceHelper(offerPrice, '.', ',') +
        currencyCheck(currency)
      : 'plata în ' +
        noOfPayments +
        ' rate' +
        ' ● ' +
        replaceHelper(offerPrice, '.', ',') +
        currencyCheck(currency) // plata în două rate
    : '';
};

const currencyCheck = (currency) => {
  return currency === 'EUR' ? ' eur/an' : ' lei/an';
};
