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
            get(value, 'name', ''),
            get(value, 'addressStreet', ''),
            get(value, 'addressCity', ''),
            get(value, 'addressCounty', ''),
          ].filter((v) => v !== null),
          ', '
        );
      case 'main-list2':
        return join(
          [
            'Strada ' +
              get(value, 'addressStreet', null) +
              ' ' +
              get(value, 'number', null),
            get(value, 'addressCity', null),
            'jud. ' + get(value, 'addressCounty', ''),
          ].filter((v) => v !== null),
          ', '
        );
      case 'policy-list':
        return join(
          [
            'Strada ' +
              get(value, 'addressStreet', null) +
              ' ' +
              get(value, 'addressBuildingNumber', null),
            get(value, 'addressCity', null),
            'judetul ' + get(value, 'addressCounty', ''),
            'Cod ' + get(value, 'address.postalCode', ''),
          ].filter((v) => v !== null),
          ', '
        );

      default:
        return '';
    }
  }
}
