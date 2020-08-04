import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forOwn, get, set } from 'lodash';
import { Observable } from 'rxjs';
import { autoCompleteConfigHelper } from 'src/app/shared/data/autocomplete-config-helper';
import { dateTimeConfigHelper } from 'src/app/shared/data/datetime-config-helper';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { locuinteFieldsData } from 'src/app/shared/data/locuinte-field-data';
import { radiosConfigHelper } from 'src/app/shared/data/radios-config-helper';
import { selectConfigHelper } from 'src/app/shared/data/select-config-helper';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { LocuinteFormType } from 'src/app/shared/models/modes/locuinte-form-modes';

@Injectable({
  providedIn: 'root',
})
export class LocuinteFormService {
  constructor(private fb: FormBuilder) {}

  buildLocuinteSubform(model: Locuinte) {
    // info: {
    //   type: string;
    //   resistenceStructure: string;
    //   buildYear: number;
    //   value: {
    //     currency: string;
    //     sum: string;
    //   }
    //   occupancy: string;
    //   usablesurface: number;
    //   heightRegime: number;
    //   roomCount: number;
    //   alarm: boolean;
    // }
    return this.fb.group({
      type: this.fb.control(get(model, 'info.type', ''), Validators.required),
      resistenceStructure: this.fb.control(
        get(model, 'info.resistenceStructure', ''),
        Validators.required
      ),
      buildYear: this.fb.control(
        get(model, 'info.buildYear', ''),
        Validators.required
      ),
      valueCurrency: this.fb.control(
        get(model, 'info.valueCurrency', ''),
        Validators.required
      ),
      valueSum: this.fb.control(
        get(model, 'info.valueSum', 0),
        Validators.required
      ),
      occupancy: this.fb.control(
        get(model, 'info.occupancy', ''),
        Validators.required
      ),
      usableSurface: this.fb.control(
        get(model, 'info.usableSurface', ''),
        Validators.required
      ),
      heightRegime: this.fb.control(get(model, 'info.heightRegime', 1), [
        Validators.required,
        Validators.min(1),
      ]),
      roomCount: this.fb.control(get(model, 'info.roomCount', 1), [
        Validators.required,
        Validators.min(1),
      ]),
      alarm: this.fb.control(
        get(model, 'info.alarm', false),
        Validators.required
      ),
      // Additional - add validator after build
      name: this.fb.control(get(model, 'name', '')),
    });
  }

  buildAddressSubform(model: Locuinte) {
    // address: {
    //   county: string;
    //   city: string;
    //   street: string;
    //   number: number;
    //   // Scara bloc.
    //   entrance: string;
    // }
    return this.fb.group({
      county: this.fb.control(
        get(model, 'address.county', ''),
        Validators.required
      ),
      city: this.fb.control(
        get(model, 'address.city', ''),
        Validators.required
      ),
      street: this.fb.control(
        get(model, 'address.street', ''),
        Validators.required
      ),
      number: this.fb.control(
        get(model, 'address.number', ''),
        Validators.required
      ),
      entrance: this.fb.control(get(model, 'address.entrance', '')),
      apartment: this.fb.control(
        get(model, 'address.apartment', ''),
        Validators.required
      ),
      postalCode: this.fb.control(
        get(model, 'address.postalCode', ''),
        Validators.required
      ),
      // Additional - add validator after build
      name: this.fb.control(get(model, 'name', '')),
    });
  }

  buildFormConfig(formType) {
    let configModel = null;
    switch (formType) {
      case LocuinteFormType.ADDRESS:
        configModel = {
          county: selectConfigHelper({ label: 'Județ' }),
          city: selectConfigHelper({ label: 'Localitate' }),
          street: autoCompleteConfigHelper({
            label: 'Strada',
            dataServiceCb: this.streetLookup,
          }),
          number: inputConfigHelper({
            label: 'Număr',
            type: 'text',
            placeholder: '',
          }),
          entrance: inputConfigHelper({
            label: 'Scara (opțional)',
            type: 'text',
            placeholder: '',
          }),
          apartment: inputConfigHelper({
            label: 'Apartament',
            type: 'text',
            placeholder: '',
          }),
          postalCode: inputConfigHelper({
            label: 'Cod poștal',
            type: 'text',
            placeholder: '',
          }),
          name: inputConfigHelper({
            label: 'Vrei să dai o denumire acestui profil? (opțional)',
            type: 'text',
            placeholder: 'Ex: Casa de vacanță',
          }),
        };
        break;

      case LocuinteFormType.PLACE:
        configModel = {
          type: radiosConfigHelper({
            label: 'Tip',
            mode: 'chip',
          }),
          resistenceStructure: selectConfigHelper({
            label: 'Structură de rezistență',
          }),
          buildYear: dateTimeConfigHelper({
            label: 'Anul construcției',
            displayFormat: 'YYYY',
            pickerFormat: 'YYYY',
          }),
          valueCurrency: radiosConfigHelper({
            label: 'Monedă',
            mode: 'chip',
          }),
          valueSum: inputConfigHelper({
            label: 'Suma',
            type: 'number',
            placeholder: 'Completează',
          }),
          occupancy: radiosConfigHelper({
            label: 'Ocupare',
            mode: 'chip',
          }),
          usableSurface: inputConfigHelper({
            label: 'Suprafața utilă în metri pătrați',
            type: 'number',
            placeholder: 'Completează',
          }),
          heightRegime: inputConfigHelper({
            label: 'Regim de înălțime',
            type: 'number',
            placeholder: '',
          }),
          roomCount: inputConfigHelper({
            label: 'Număr de camere',
            type: 'number',
            placeholder: '',
          }),

          alarm: radiosConfigHelper({
            label: 'Alarmă antiefracție sau pază permanentă',
            mode: 'chip',
          }),
          name: inputConfigHelper({
            label: 'Vrei să dai o denumire acestui profil? (opțional)',
            type: 'text',
            placeholder: 'Ex: Casa de vacanță',
          }),
        };
        configModel.usableSurface.spinnerConfig = { step: 1 };
        configModel.usableSurface.min = 0;
        configModel.heightRegime.spinnerConfig = { step: 1 };
        configModel.heightRegime.min = 1;
        configModel.roomCount.spinnerConfig = { step: 1 };
        configModel.roomCount.min = 1;
        configModel.buildYear.min = 1800;
        configModel.buildYear.max = new Date().getFullYear();
        break;

      default:
        break;
    }
    return configModel;
  }

  getFormFieldsData(fieldsObj, defaultV: { [key: string]: any } = {}) {
    const data = {};
    const fData = locuinteFieldsData;
    forOwn(fieldsObj, (v, k) => {
      set(data, k, get(fData, k, get(defaultV, k, null)));
    });
    return data;
  }

  streetLookup(input: any): Observable<Array<any>> {
    return new Observable((observer) => {
      observer.next([{ id: 'test', label: 'test' }]);
    });
  }
}
