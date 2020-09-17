import { PolicyStates } from './../../../shared/models/data/policy-states';
import { PolicyOffer } from './../../../shared/models/data/policy-offer';
import { Account } from './../../../core/models/account.interface';
import { Injectable } from '@angular/core';
import { get } from 'lodash';
import { PolicyLocuintaListItem } from './../../../shared/models/component/policy-locuinta-list-item';
import { PolicyType } from 'src/app/shared/models/data/policy-type';

@Injectable({
  providedIn: 'root',
})
export class PolicyFormService {
  constructor() {}

  buildPolicyLocuintaModel(
    data: Array<any>,
    type: string
  ): Array<PolicyLocuintaListItem> {
    if (data[0]) {
      const policies = data[1] ? data[1] : [];
      return data[0].map((l) => {
        if (!policies.length) {
          return { locuinta: l };
        } else {
          const found = policies.find((p) => {
            // const lId = get(p, 'locuintaId', -2);
            // return (
            //   get(l, 'id', -1).toString() === (lId ? lId : -2).toString() &&
            const locP = get(p, 'locuintaId', -2);
            return (
              get(l, 'id', -1).toString() === (locP ? locP.toString() : '') &&
              get(p, 'typeId', '-') === type
            );
          });

          return {
            locuinta: l,
            policy: found,
          };
        }
      });
    } else {
      return [];
    }
  }

  buildOfferItem(conf: {
    locuintaItem: PolicyLocuintaListItem;
    pType: PolicyType;
    cesiune: Array<any>;
    fromDate: any;
    account: Account;
    payData: any;
    supportData: any;
  }): PolicyOffer {
    const fromD = new Date(conf.fromDate);
    const offer: PolicyOffer = {
      id: null,
      expiry: new Date(new Date().setDate(new Date().getDate() + 3)),
      policy: {
        id: null,
        name: get(conf, 'pType.name', null),
        state: PolicyStates.PAY,
        locuintaId: get(conf, 'locuintaItem.locuinta.id', null),
        locuintaData: get(conf, 'locuintaItem.locuinta', null),
        userId: get(conf, 'account.id', null),
        userData: get(conf, 'account', null),
        cesiune: get(conf, 'cesiune', null),
        type: get(conf, 'pType', null),
        typeId: get(conf, 'pType.id', null),
        dates: {
          from: new Date(conf.fromDate),
          to: new Date(fromD.setFullYear(new Date(fromD).getFullYear() + 1)),
        },
      },
    };
    return offer;
  }
}
