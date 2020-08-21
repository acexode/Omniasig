import { IonRadiosConfig } from './../../../../../shared/models/component/ion-radios-config';
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

  buildLocuinteSubform(model: Locuinte, policyType?: string) {
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
        get(model, 'info.occupancy', null),
        Validators.required
      ),
      usableSurface: this.fb.control(
        Number(get(model, 'info.usableSurface', 0)),
        Validators.required
      ),
      heightRegime: this.fb.control(
        Number(get(model, 'info.heightRegime', 1)),
        [Validators.required, Validators.min(1)]
      ),
      roomCount: this.fb.control(Number(get(model, 'info.roomCount', 1)), [
        Validators.required,
        Validators.min(1),
      ]),
      alarm: this.fb.control(
        get(model, 'info.alarm', false),
        Validators.required
      ),
      // Additional - add validator after build
      // name: this.fb.control(get(model, 'name', '')),
    });
  }

  buildAddressSubform(model: Locuinte, policyType?: string) {
    // address: {
    //   county: string;
    //   city: string;
    //   street: string;
    //   number: number;
    //   // Scara bloc.
    //   entrance: string;
    // }
    const group = this.fb.group({
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
      postalCode: this.fb.control(get(model, 'address.postalCode', ''), [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(6),
      ]),
      // Additional - add validator after build
      name: this.fb.control(get(model, 'name', '')),
    });

    if (policyType === 'PAD') {
      group.addControl(
        'padAvailable',
        this.fb.control(get(model, 'pad.padAvailable', ''), Validators.required)
      );
      group.addControl('padNr', this.fb.control(get(model, 'pad.padNr', '')));
      group.addControl(
        'padSerie',
        this.fb.control(get(model, 'pad.padSerie', ''))
      );
    }
    return group;
  }

  buildFormConfig(formType, policyType?: string) {
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
            type: 'number',
            placeholder: '',
            custom: {
              maxLength: 6,
              minLength: 6,
            },
          }),
          name: inputConfigHelper({
            label: 'Vrei să dai o denumire acestui profil? (opțional)',
            type: 'text',
            placeholder: 'Ex: Casa de vacanță',
          }),
        };

        if (policyType === 'PAD') {
          configModel.padAvailable = radiosConfigHelper({
            label: 'Ai deja o poliță PAD valabilă pentru această adresă?',
            mode: 'item',
          });
          configModel.padAvailable.itemClasses = 'w-50 inline-flex';
          configModel.padAvailable.inputLabel.classes = 'mb-16';
          configModel.padSerie = inputConfigHelper({
            label: 'Serie',
            type: 'text',
            placeholder: '',
          });
          configModel.padNr = inputConfigHelper({
            label: 'Serie',
            type: 'text',
            placeholder: '',
          });
        }
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
        configModel.valueSum.spinnerConfig = { step: 1 };
        configModel.valueSum.min = 1;
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
      observer.next(locuinteFieldsData.street);
    });
  }

  processFormModel(formGroupValue, existingModel?: Locuinte): Locuinte {
    const newModel: Locuinte = existingModel
      ? { ...existingModel }
      : {
          id: null,
          name: null,
          info: null,
          address: null,
          policyData: [],
          tipLocuinta: null,
          pad: null,
        };

    forOwn(formGroupValue, (val, key) => {
      switch (key) {
        case 'apartment':
        case 'city':
        case 'county':
        case 'entrance':
        case 'number':
        case 'postalCode':
        case 'street':
          set(newModel, 'address.' + key, val);
          break;
        case 'alarm':
        case 'buildYear':
        case 'heightRegime':
        case 'occupancy':
        case 'resistenceStructure':
        case 'roomCount':
        case 'type':
        case 'usableSurface':
        case 'valueCurrency':
        case 'valueSum':
          set(newModel, 'info.' + key, val);
          break;
        case 'padAvailable':
        case 'padNr':
        case 'padSerie':
          set(newModel, 'pad.' + key, val);
          break;
        default:
          set(newModel, key, val);
          break;
      }
    });
    return newModel;
  }
}
