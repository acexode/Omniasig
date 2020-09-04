import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { Pipe, PipeTransform } from '@angular/core';
import { get, join } from 'lodash';

@Pipe({
  name: 'locuinteName',
})
export class LocuinteNamePipe implements PipeTransform {
  transform(value: Partial<Locuinte>, type?: string): unknown {
    if (!value) {
      return '';
    }
    switch (type) {
      case 'main-list':
        return join(
          [
            get(value, 'name', null),
            get(value, 'address.addressStreet', null),
            get(value, 'address.addressCity', null),
            get(value, 'address.addressCounty', ''),
          ].filter((v) => v !== null),
          ', '
        );
      case 'main-list2':
        return join(
          [
            'Strada ' +
              get(value, 'address.addressStreet', null) +
              ' ' +
              get(value, 'address.number', null),
            get(value, 'address.addressCity', null),
            'jud. ' + get(value, 'address.addressCounty', ''),
          ].filter((v) => v !== null),
          ', '
        );
      case 'policy-list':
        return join(
          [
            'Strada ' +
              get(value, 'address.street', null) +
              ' ' +
              get(value, 'address.number', null),
            get(value, 'address.city', null),
            'judetul ' + get(value, 'address.county', ''),
            'Cod ' + get(value, 'address.postalCode', ''),
          ].filter((v) => v !== null),
          ', '
        );

      default:
        return '';
    }
  }
}
