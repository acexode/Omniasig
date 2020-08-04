import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { has, get } from 'lodash';
import { Observable, of } from 'rxjs';

@Injectable()
export class AutocompleteProviderService implements AutoCompleteService {
  labelAttribute = 'label';
  formValueAttribute?: any;
  currentData: any[] = [];
  dataServiceCb: (filter: any) => Observable<Array<any>> = () => {
    return of([]);
  }
  constructor() {}

  updateConfig(conf: {
    labelAttribute: string;
    formValueAttribute?: any;
    currentData?: any[];
    dataServiceCb?: (filter: any) => Observable<Array<any>>;
  }) {
    console.log(conf);
    if (has(conf, 'labelAttribute')) {
      this.labelAttribute = conf.labelAttribute;
    }
    if (has(conf, 'formValueAttribute')) {
      this.formValueAttribute = conf.formValueAttribute;
    }
    if (has(conf, 'currentData')) {
      this.currentData = conf.currentData;
    }
    if (has(conf, 'dataServiceCb')) {
      this.dataServiceCb = conf.dataServiceCb;
    }
  }

  getResults(term: any) {
    return this.dataServiceCb(term);
  }
  getItemLabel?(item: any) {
    return get(item, this.labelAttribute, '');
  }
}
