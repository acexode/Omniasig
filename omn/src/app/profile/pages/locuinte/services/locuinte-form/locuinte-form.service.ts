import { take } from 'rxjs/internal/operators/take';
import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { forOwn, get, set, has } from 'lodash';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';
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
  streets$ = this.locuinteS.streetStore$;
  city$ = this.locuinteS.cityStore$;
  tipStreets$ = this.locuinteS.tipStreetStore$;
  constructor(private fb: FormBuilder, protected locuinteS: LocuinteService) {}

  buildLocuinteSubform(model: Locuinte, policyType?: string) {
    // info: {
    //   type: string;
    //   structure: string;
    //   yearConstruction: number;
    //   value: {
    //     currency: string;
    //     sum: string;
    //   }
    //   typeUse: string;
    //   area: number;
    //   floors: number;
    //   rooms: number;
    //   hasAlarmSystem: boolean;
    // }
    return this.fb.group({
      type: this.fb.control(
        get(model, 'type', 'apartament'),
        Validators.required
      ),
      structure: this.fb.control(
        get(model, 'structure', 'beton_armat'),
        Validators.required
      ),
      yearConstruction: this.fb.control(
        get(model, 'yearConstruction', 1980),
        Validators.required
      ),
      valueCurrency: this.fb.control(
        get(model, 'valueCurrency', 'EUR'),
        Validators.required
      ),
      value: this.fb.control(get(model, 'value', 21000), [
        Validators.required,
        Validators.min(21000),
        Validators.max(200000),
      ]),
      typeUse: this.fb.control(
        get(model, 'typeUse', 'permanent'),
        Validators.required
      ),
      area: this.fb.control(Number(get(model, 'area', 10)), [
        Validators.required,
        Validators.min(10),
        Validators.max(600),
      ]),
      floors: this.fb.control(Number(get(model, 'floors', 1)), [
        Validators.required,
        Validators.min(1),
        Validators.max(20),
      ]),
      rooms: this.fb.control(Number(get(model, 'rooms', 1)), [
        Validators.required,
        Validators.min(1),
        Validators.max(20),
      ]),
      hasAlarmSystem: this.fb.control(
        get(model, 'hasAlarmSystem', false),
        Validators.required
      ),
      // Additional - add validator after build
      // name: this.fb.control(get(model, 'name', '')),
    });
  }

  buildAddressSubform(
    model: Locuinte,
    policyType?: string,
    disabled?: boolean
  ) {
    // address: {
    //   addressCounty: string;
    //   addressCity: string;
    //   addressStreet: string;
    //   number: number;
    //   // Scara bloc.
    //   addressScara: string;
    // }
    const group = this.fb.group({
      addressCounty: this.fb.control(
        get(model, 'addressCounty', ''),
        Validators.required
      ),
      addressCity: this.fb.control(
        get(model, 'addressCity', ''),
        Validators.required
      ),
      addressStreet: this.fb.control('', Validators.required),
      addressStreetType: this.fb.control(get(model, 'addressStreetType', '')),
      addressName: this.fb.control(get(model, 'addressName', '')),
      addressStreetNumber: this.fb.control(
        get(model, 'addressStreetNumber', '') !== 0
          ? get(model, 'addressStreetNumber', '')
          : '',
        Validators.required
      ),
      addressBuildingNumber: this.fb.control(
        get(model, 'addressBuildingNumber', '') !== 0
          ? get(model, 'addressBuildingNumber', '')
          : ''
      ),
      addressScara: this.fb.control(get(model, 'addressScara', '')),
      addressApart: this.fb.control(get(model, 'addressApart', '')),
      addressPostalCode: this.fb.control(
        {
          value: get(model, 'addressPostalCode', ''),
          disabled: true,
        },
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)]
      ),
      // Additional - add validator after build
      name: this.fb.control(get(model, 'name', '')),
    });

    if (disabled) {
      group.disable();
    }
    return group;
  }

  buildFormConfig(formType, policyType?: string, isDisabled?: boolean) {
    let configModel = null;
    switch (formType) {
      case LocuinteFormType.ADDRESS:
        configModel = {
          addressCounty: selectConfigHelper({
            label: 'Județ',
            disabled: isDisabled,
            idKey: 'name',
            labelKey: 'name',
          }),
          addressCity: autoCompleteConfigHelper({
            label: 'Localitate',
            disabled: isDisabled,
            dataServiceCb: this.cityLookup,
            dataServiceSource: this.city$,
            clearInvalid: true,
            idKey: 'name',
            labelKey: 'name',
          }),
          addressStreet: autoCompleteConfigHelper({
            label: 'Strada',
            disabled: isDisabled,
            dataServiceCb: this.streetLookup,
            dataServiceSource: this.streets$,
            clearInvalid: true,
            idKey: 'name',
            labelKey: 'name',
            detailAttribute: 'streetType',
          }),
          addressStreetType: selectConfigHelper({
            label: 'Tip strada',
            disabled: isDisabled,
            idKey: 'name',
            labelKey: 'name',
          }),
          addressName: inputConfigHelper({
            label: 'Nume strada',
            type: 'text',
            placeholder: 'Completează',
            disabled: isDisabled,
          }),
          addressStreetNumber: inputConfigHelper({
            label: 'Număr',
            type: 'text',
            placeholder: '',
            disabled: isDisabled,
          }),
          addressBuildingNumber: inputConfigHelper({
            label: 'Bloc (opțional)',
            type: 'text',
            placeholder: '',
            disabled: isDisabled,
          }),
          addressScara: inputConfigHelper({
            label: 'Scara (opțional)',
            type: 'text',
            placeholder: '',
            disabled: isDisabled,
          }),
          addressApart: inputConfigHelper({
            label: 'Apartament (opțional)',
            type: 'text',
            placeholder: '',
            disabled: isDisabled,
          }),
          addressPostalCode: inputConfigHelper({
            label: 'Cod poștal',
            type: 'number',
            placeholder: '',
            custom: {
              maxLength: 6,
              minLength: 6,
            },
            disabled: true,
          }),
          name: inputConfigHelper({
            label: 'Vrei să dai o denumire acestui profil? (opțional)',
            type: 'text',
            placeholder: 'Ex: Casa de vacanță',
            disabled: isDisabled,
            custom: {
              autoCapitalize: 'sentences',
            },
          }),
        };
        break;

      case LocuinteFormType.PLACE:
        configModel = {
          type: radiosConfigHelper({
            label: 'Tip',
            mode: 'chip',
          }),
          structure: selectConfigHelper({
            label: 'Structură de rezistență',
            disabled: isDisabled,
          }),
          yearConstruction: dateTimeConfigHelper({
            label: 'Anul construcției',
            displayFormat: 'YYYY',
            pickerFormat: 'YYYY',
            disabled: isDisabled,
          }),
          valueCurrency: radiosConfigHelper({
            label: 'Monedă',
            mode: 'chip',
          }),
          value: inputConfigHelper({
            label: 'Suma',
            type: 'number',
            placeholder: 'Completează',
            disabled: isDisabled,
            custom: {
              clearOnEdit: true,
            },
          }),
          typeUse: radiosConfigHelper({
            label: 'Ocupare',
            mode: 'chip',
          }),
          area: inputConfigHelper({
            label: 'Suprafața utilă în metri pătrați',
            type: 'number',
            placeholder: 'Completează',
            disabled: isDisabled,
            custom: {
              clearOnEdit: true,
            },
          }),
          floors: inputConfigHelper({
            label: 'Regim de înălțime',
            type: 'number',
            placeholder: '',
            disabled: isDisabled,
            custom: {
              clearOnEdit: true,
            },
          }),
          rooms: inputConfigHelper({
            label: 'Număr de camere',
            type: 'number',
            placeholder: '',
            disabled: isDisabled,
            custom: {
              clearOnEdit: true,
            },
          }),

          hasAlarmSystem: radiosConfigHelper({
            label: 'Alarmă antiefracție sau pază permanentă',
            mode: 'chip',
          }),
          name: inputConfigHelper({
            label: 'Vrei să dai o denumire acestui profil? (opțional)',
            type: 'text',
            placeholder: 'Ex: Casa de vacanță',
            disabled: isDisabled,
            custom: {
              autoCapitalize: 'sentences',
            },
          }),
        };

        configModel.area.spinnerConfig = { step: 1 };
        configModel.area.min = 10;
        configModel.area.max = 600;
        configModel.floors.spinnerConfig = { step: 1 };
        configModel.floors.min = 1;
        configModel.floors.max = 20;
        configModel.rooms.spinnerConfig = { step: 1 };
        configModel.value.spinnerConfig = { step: 1 };
        configModel.value.min = 21000;
        configModel.value.max = 200000;
        configModel.rooms.min = 1;
        configModel.rooms.max = 20;
        configModel.yearConstruction.min = 1700;
        configModel.yearConstruction.max = new Date().getFullYear();
        break;

      default:
        break;
    }
    return configModel;
  }

  getFormFieldsData(fieldsObj, defaultV: { [key: string]: any } = {}) {
    const data = {};
    const fData = { ...locuinteFieldsData };
    forOwn(fieldsObj, (v, k) => {
      set(data, k, get(fData, k, get(defaultV, k, null)));
    });
    return data;
  }

  handleInitialCityAndStreets(countyField, cityField, fieldData) {
    const countyValue = countyField.value;
    if (countyValue) {
      return new Observable((observer) => {
        this.updateCounty(countyField, fieldData).subscribe((vals) => {
          const cityValue = cityField.value;
          if (cityValue) {
            this.updateCity(cityField, fieldData).subscribe((v) =>
              observer.next(true)
            );
          } else {
            observer.next(true);
          }
        });
      }).pipe(take(1));
    } else {
      return of(true);
    }
  }

  handleInitialCounty(field, fieldsData) {
    return this.locuinteS.getCounties().pipe(
      map((vals: any) => {
        fieldsData.addressCounty = vals;
        return vals;
      })
    );
  }

  handleStreetProcessing(id, fieldsData, dataModel = {}) {
    const vvv = fieldsData.addressStreet ? fieldsData.addressStreet : [];
    const f = vvv.find((v) => {
      try {
        const vName = v.name.toString();
        const vId = v.id.toString();
        const vF = id.toString();
        return vName === vF || vId === vF;
      } catch (err) {
        return false;
      }
    });
    set(dataModel, 'addressStreetType', get(f, 'streetType', 'Strada'));
    set(dataModel, 'addressName', get(f, 'shortName', ''));
    set(dataModel, 'addressStreetCode', get(f, 'id', null));
  }

  setInitialStreetValue(
    addressModel,
    streetField: AbstractControl,
    streetNameField: AbstractControl,
    fieldsData
  ) {
    const vvv = fieldsData.addressStreet ? fieldsData.addressStreet : [];
    const name = get(addressModel, 'addressStreet', '');
    const code = get(addressModel, 'addressStreetCode', null);
    const f = vvv.find((v) => {
      try {
        const vName = v.name.toString();
        const vCode = code ? code.toString() : '';
        const vId = v.id.toString();
        return vName === name || vId === vCode;
      } catch (err) {
        return false;
      }
    });
    if (f && streetField) {
      streetField.patchValue(get(f, 'name', null));
      streetField.updateValueAndValidity();
    } else if (streetNameField) {
      streetNameField.patchValue(name);
      streetNameField.updateValueAndValidity();
    }
  }

  handlePostalCode(id, fieldsData, addressPostalCode, cityValue = null) {
    const vvv = fieldsData.addressStreet ? fieldsData.addressStreet : [];
    const f = vvv.find((v) => {
      try {
        const vName = v.name.toString();
        const vId = v.id.toString();
        const vF = id.toString();
        return vName === vF || vId === vF;
      } catch (err) {
        return false;
      }
    });
    let postCode = get(f, 'postCode', null);
    // Default to a city value, if available.
    if (!vvv.length || (cityValue && !postCode)) {
      const vv = fieldsData.addressCity ? fieldsData.addressCity : [];
      const cV = cityValue ? cityValue : null;
      const f2 = vv.find((v) => {
        try {
          const vName = v.name.toString();
          const vId = v.id.toString();
          const vF = cV.toString();
          return vName === vF || vId === vF;
        } catch (err) {
          return false;
        }
      });
      postCode = get(f2, 'postCode', null);
    }
    try {
      postCode =
        postCode.toString().trim().length > 0 ? postCode.toString() : null;
    } catch (e) {
      postCode = null;
    }
    addressPostalCode.patchValue(postCode);
  }

  resetStreetFieldValues(
    streetField: AbstractControl,
    streetNameField: AbstractControl,
    streetTypeField: AbstractControl,
    singleField = true,
    reset = false
  ) {
    if (streetField) {
      if (singleField) {
        streetField.setValidators([Validators.required]);
      } else {
        streetField.clearValidators();
      }
      if (reset) {
        streetField.patchValue('');
      }
      streetField.updateValueAndValidity();
    }
    [streetNameField, streetTypeField].forEach((f: AbstractControl) => {
      if (f) {
        if (singleField) {
          f.clearValidators();
        } else {
          f.setValidators([Validators.required]);
        }
        if (reset) {
          f.patchValue('');
        }
        f.updateValueAndValidity();
      }
    });
  }

  updateCounty(field, fieldsData, dataModel = {}) {
    const vvv = fieldsData.addressCounty ? fieldsData.addressCounty : [];
    const addressCounty = vvv.find((v) => {
      try {
        const vName = v.name.toString();
        const vId = v.id.toString();
        const vF = field.value.toString();
        return vName === vF || vId === vF;
      } catch (err) {
        return false;
      }
    });
    if (addressCounty) {
      set(dataModel, 'addressCountyCode', addressCounty.id);
      return this.locuinteS.getCities(addressCounty.id).pipe(
        take(1),
        map((data: any) => {
          this.locuinteS.cityStore$.next(data);
          fieldsData.addressCity = data;
          return data;
        })
      );
    }
    return of([]);
  }

  updateCity(field, fieldsData, dataModel = {}) {
    const addressCity = (fieldsData.addressCity
      ? fieldsData.addressCity
      : []
    ).find((v) => {
      try {
        const vName = v.name.toString();
        const vId = v.id.toString();
        const vF = field.value.toString();
        return vName === vF || vId === vF;
      } catch (err) {
        return false;
      }
    });
    if (addressCity) {
      set(dataModel, 'addressCityCode', addressCity.id);
      const obj = {
        countryId: addressCity.countryId,
        countyId: addressCity.countyId,
        cityId: addressCity.id,
        postCode: null,
        statedId: addressCity.statedId,
      };
      return this.locuinteS.getStreets(obj).pipe(
        take(1),
        map((v) => {
          this.locuinteS.streetStore$.next(v);
          fieldsData.addressStreet = v;
          return v;
        })
      );
    } else {
      fieldsData.addressStreet = [];
      return of(null);
    }
  }

  streetLookup(
    input: any,
    source?: BehaviorSubject<any>
  ): Observable<Array<any>> {
    const keywords = input ? input.toString() : null;

    if (source && source instanceof BehaviorSubject) {
      return source.pipe(
        map((data) => {
          // Filter whole list in here based on text input.
          if (keywords) {
            return data.filter((dV) => {
              const name = get(dV, 'name', '').toLowerCase();
              const streetType = get(dV, 'streetType', '').toLowerCase();
              const sName = get(dV, 'shortName', '').toLowerCase();
              let id = get(dV, 'id', '');
              try {
                id = id.toString().toLowerCase();
              } catch (e) {
                id = null;
              }
              return (
                name.includes(keywords.toLowerCase()) ||
                id.includes(keywords.toLowerCase()) ||
                streetType.includes(keywords.toLowerCase()) ||
                sName.includes(keywords.toLowerCase())
              );
            });
          } else {
            return data;
          }
        })
      );
    } else {
      return of([]);
    }
  }
  cityLookup(
    input: any,
    source?: BehaviorSubject<any>
  ): Observable<Array<any>> {
    const keywords = input ? input.toString() : null;

    if (source && source instanceof BehaviorSubject) {
      return source.pipe(
        map((data) => {
          // Filter whole list in here based on text input.
          if (keywords) {
            return data.filter((dV) => {
              const name = get(dV, 'name', '').toLowerCase();
              const streetType = get(dV, 'streetType', '').toLowerCase();
              const sName = get(dV, 'shortName', '').toLowerCase();
              let id = get(dV, 'id', '');
              try {
                id = id.toString().toLowerCase();
              } catch (e) {
                id = null;
              }
              return (
                name.includes(keywords.toLowerCase()) ||
                id.includes(keywords.toLowerCase()) ||
                streetType.includes(keywords.toLowerCase()) ||
                sName.includes(keywords.toLowerCase())
              );
            });
          } else {
            return data;
          }
        })
      );
    } else {
      return of([]);
    }
  }
  processFormModel(
    formGroupValue,
    existingModel?: Locuinte | any,
    separateInputs = false
  ): Locuinte {
    const newModel: Locuinte = existingModel
      ? existingModel.hasOwnProperty('response')
        ? { ...get(existingModel, 'response', {}) }
        : { ...existingModel }
      : {
          id: null,
          // name: null,
          info: null,
          address: null,
          policyData: [],
          tipLocuinta: null,
          pad: null,
          locuintaState: null,
        };

    forOwn(formGroupValue, (val, key) => {
      switch (key) {
        case 'addressCity':
        case 'addressCounty':
        case 'name':
        case 'addressStreetNumber':
        case 'addressScara':
        case 'addressPostalCode':
          set(newModel, key, val);
          break;
        case 'yearConstruction':
          const v = val ? parseInt(val, 10) : val;
          set(newModel, key, val > 0 ? val : 1980);
          break;
        case 'addressStreet':
        case 'addressApart':
        case 'addressBuildingNumber':
          set(newModel, key, val ? val : '');
          break;
        case 'hasAlarmSystem':
        case 'floors':
        case 'typeUse':
        case 'rooms':
        case 'area':
        case 'valueCurrency':
        case 'value':
        case 'structure':
        case 'type':
          set(newModel, key, val);
          break;
        case 'addressStreetType':
        case 'addressStreetCode':
        case 'addressName':
          if (separateInputs) {
            set(newModel, key, val);
          }
          break;
        case 'addressCountyCode':
        case 'addressCityCode':
          // Ignore.
          break;

        default:
          set(newModel, key, val);
          break;
      }
    });
    if (has(newModel, 'addressName')) {
      newModel.addressStreet = newModel.addressName;
    }
    return newModel;
  }
}
