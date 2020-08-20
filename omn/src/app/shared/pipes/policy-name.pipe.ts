import { Pipe, PipeTransform } from '@angular/core';
import { get, join } from 'lodash';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { PolicyItem } from './../models/data/policy-item';

@Pipe({
  name: 'policyName',
})
export class PolicyNamePipe implements PipeTransform {
  transform(value: Partial<PolicyItem>, type?: string): unknown {
    if (!value) {
      return '';
    }
    console.log(value);
    switch (type) {
      case 'address-policy-expiry':
        return join(
          [
            'Polita',
            get(value, 'typeId', '-'),
            'valabilă până la',
            dateHelperDMY(get(value, 'dates.to', '')),
          ].filter((v) => v !== null),
          ' '
        );
      default:
        break;
    }
  }
}
