import { Injectable } from '@angular/core';
import { AutoCompleteService } from 'ionic4-auto-complete';
import { has, get } from 'lodash';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class AutocompleteProviderService implements AutoCompleteService {
  constructor() {}
  labelAttribute = 'label';
  formValueAttribute?: any;
  currentData: any[] = [];
  dataServiceSource = new BehaviorSubject([]);
  dataServiceCb: (
    filter: any,
    source?: BehaviorSubject<any>
  ) => Observable<Array<any>> = () => {
    return of([]);
  };

  updateConfig(conf: {
    labelAttribute: string;
    formValueAttribute?: any;
    currentData?: any[];
    dataServiceCb?: (filter: any) => Observable<Array<any>>;
    dataServiceSource: BehaviorSubject<any>;
  }) {
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
    if (has(conf, 'dataServiceSource')) {
      this.dataServiceSource = conf.dataServiceSource;
    }
  }

  getResults(term: any) {
    return this.dataServiceCb(term, this.dataServiceSource);
  }
  getItemLabel?(item: any) {
    return get(item, this.labelAttribute, '');
  }
}
