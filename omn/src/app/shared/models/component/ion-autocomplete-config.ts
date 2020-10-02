import { AutoCompleteOptions } from 'ionic4-auto-complete';
import { Observable, BehaviorSubject } from 'rxjs';
import { IonTextItem } from './ion-text-item';

export interface IonAutocompleteConfig {
  inputLabel: IonTextItem;
  multiple?: boolean;
  autocompleteOptions?: AutoCompleteOptions | any;
  clearInvalid?: boolean;
  idKey?: string;
  labelKey?: string;
  placeholder?: string;
  disabled?: boolean;
  dataServiceCb: ( text: string ) => Observable<Array<any>>;
  dataServiceSource: BehaviorSubject<any>;
}
