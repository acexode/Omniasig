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
            get(value, 'addressStreet', null),
            get(value, 'addressCity', null),
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
              get(value, 'addressStreetNumber', null),
            get(value, 'addressCity', null),
            'jud. ' + get(value, 'addressCounty', ''),
          ].filter((v) => v !== null),
          ', '
        );
      case 'domiciliu-list':
        return join(
          [
            get(value, 'addressStreet', null)
              ? 'Strada ' + get(value, 'addressStreet', '')
              : '' + ' ',
            get(value, 'addressStreetNumber', ''),
            get(value, 'addressCity', null),
            get(value, 'addressCounty', null)
              ? 'jud. ' + get(value, 'addressCounty', '')
              : '',

            get(value, 'addressPostalCode', null)
              ? 'Cod ' + get(value, 'addressPostalCode', '')
              : '',
          ].filter((v) => v !== null),
          ', '
        );
      case 'policy-list':
        return join(
          [
            'Strada ' +
              get(value, 'addressStreet', null) +
              ' ' +
              get(value, 'addressStreetNumber', null),
            get(value, 'addressCity', null),
            'judetul ' + get(value, 'addressCounty', ''),
            'Cod ' + get(value, 'addressPostalCode', ''),
          ].filter((v) => v !== null),
          ', '
        );

      default:
        return '';
    }
  }
}
