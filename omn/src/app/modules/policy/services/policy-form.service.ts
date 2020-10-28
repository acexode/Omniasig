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
    if (data) {
      return data.map((l) => {
        return {
          locuinta: l,
          policy: null,
        };
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
      payData: conf.payData,
      supportData: conf.supportData,
    };
    return offer;
  }

  checkEmptyLocuintaItems(locuinta) {
    const fields = [
      'yearConstruction',
      'valueCurrency',
      'value',
      'typeUse',
      'area',
      'floors',
      'rooms',
      'hasAlarmSystem',
    ];
    return fields.find((ff) => {
      const fieldVal = get(locuinta, ff, null);
      return fieldVal === undefined || fieldVal === null || fieldVal === '';
    });
  }
}
