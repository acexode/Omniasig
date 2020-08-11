import { Pipe, PipeTransform } from '@angular/core';
import { get, find } from 'lodash';
import { locuinteFieldsData } from '../data/locuinte-field-data';

@Pipe({
  name: 'locuinteField',
})
export class LocuinteFieldPipe implements PipeTransform {
  transform(value: unknown, fieldName: string): unknown {
    let data = [];
    switch (fieldName) {
      case 'resistenceStructure':
        data = locuinteFieldsData.resistenceStructure;
        return get(find(data, { id: value }), 'label', '');
      case 'valueCurrency':
        data = locuinteFieldsData.valueCurrency;
        return get(find(data, { id: value }), 'label', '');
      case 'occupancy':
        data = locuinteFieldsData.occupancy;
        return get(find(data, { id: value }), 'label', '');
      case 'alarm':
        data = locuinteFieldsData.alarm;
        return get(find(data, { id: value }), 'label', '');
      case 'type':
        data = locuinteFieldsData.type;
        return get(find(data, { id: value }), 'label', '');

      default:
        return '';
    }
  }
}
