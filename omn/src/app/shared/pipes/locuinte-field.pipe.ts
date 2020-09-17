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
      case 'structure':
        data = locuinteFieldsData.structure;
        return get(find(data, { id: value }), 'label', '');
      case 'valueCurrency':
        data = locuinteFieldsData.valueCurrency;
        return get(find(data, { id: value }), 'label', '');
      case 'typeUse':
        data = locuinteFieldsData.typeUse;
        return get(find(data, { id: value }), 'label', '');
      case 'hasAlarmSystem':
        data = locuinteFieldsData.hasAlarmSystem;
        return get(find(data, { id: value }), 'label', '');
      case 'type':
        data = locuinteFieldsData.type;
        return get(find(data, { id: value }), 'label', '');

      default:
        return '';
    }
  }
}
