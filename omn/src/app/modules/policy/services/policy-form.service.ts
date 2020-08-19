import { Injectable } from '@angular/core';
import { PolicyLocuintaListItem } from './../../../shared/models/component/policy-locuinta-list-item';
import { get } from 'lodash';

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
      console.log(data[1]);
      console.log(type);
      const policies = data[1] ? data[1] : [];
      return data[0].map((l) => {
        if (!policies.length) {
          return { locuinta: l };
        } else {
          console.log(policies);
          const found = policies.find((p) => {
            return (
              get(l, 'id', -1).toString() ===
                get(p, 'locuintaId', -2).toString() &&
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
}
