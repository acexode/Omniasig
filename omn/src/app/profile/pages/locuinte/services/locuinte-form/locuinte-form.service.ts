import { take } from 'rxjs/internal/operators/take';
import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { forOwn, get, set } from 'lodash';
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
      type: this.fb.control(get(model, 'type', ''), Validators.required),
      structure: this.fb.control(
        get(model, 'structure', ''),
        Validators.required
      ),
      yearConstruction: this.fb.control(
        get(model, 'yearConstruction', 0),
        Validators.required
      ),
      valueCurrency: this.fb.control(
        get(model, 'valueCurrency', ''),
        Validators.required
      ),
      value: this.fb.control(get(model, 'value', 0), Validators.required),
      typeUse: this.fb.control(
        get(model, 'typeUse', null),
        Validators.required
      ),
      area: this.fb.control(Number(get(model, 'area', 0)), Validators.required),
      floors: this.fb.control(Number(get(model, 'floors', 1)), [
        Validators.required,
        Validators.min(1),
      ]),
      rooms: this.fb.control(Number(get(model, 'rooms', 1)), [
        Validators.required,
        Validators.min(1),
      ]),
      hasAlarmSystem: this.fb.control(
        get(model, 'hasAlarmSystem', false),
        Validators.required
      ),
      // Additional - add validator after build
      // name: this.fb.control(get(model, 'name', '')),
    });
  }

  buildAddressSubform(model: Locuinte, policyType?: string) {
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
      addressStreet: this.fb.control(
        get(model, 'addressStreet', ''),
        Validators.required
      ),
      addressBuildingNumber: this.fb.control(
        get(model, 'addressBuildingNumber', ''),
        Validators.required
      ),
      addressScara: this.fb.control(get(model, 'addressScara', '')),
      addressApart: this.fb.control(
        get(model, 'addressApart', ''),
        Validators.required
      ),
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

    group.addControl(
      'padAvailable',
      this.fb.control(get(model, 'pad.padAvailable', ''), Validators.required)
    );
    group.addControl('padNr', this.fb.control(get(model, 'pad.padNr', '')));
    group.addControl(
      'padSerie',
      this.fb.control(get(model, 'pad.padSerie', ''))
    );
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
          addressCity: selectConfigHelper({
            label: 'Localitate',
            disabled: isDisabled,
            idKey: 'name',
            labelKey: 'name',
          }),
          addressStreet: autoCompleteConfigHelper({
            label: 'Strada',
            disabled: isDisabled,
            dataServiceCb: this.streetLookup,
            dataServiceSource: this.streets$,
            idKey: 'name',
            labelKey: 'name',
          }),
          addressBuildingNumber: inputConfigHelper({
            label: 'Număr',
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
            label: 'Apartament',
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
          }),
        };
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
          label: 'Număr',
          type: 'text',
          placeholder: '',
        });
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
          }),
          floors: inputConfigHelper({
            label: 'Regim de înălțime',
            type: 'number',
            placeholder: '',
            disabled: isDisabled,
          }),
          rooms: inputConfigHelper({
            label: 'Număr de camere',
            type: 'number',
            placeholder: '',
            disabled: isDisabled,
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
          }),
        };

        configModel.area.spinnerConfig = { step: 1 };
        configModel.area.min = 0;
        configModel.floors.spinnerConfig = { step: 1 };
        configModel.floors.min = 1;
        configModel.rooms.spinnerConfig = { step: 1 };
        configModel.value.spinnerConfig = { step: 1 };
        configModel.value.min = 1;
        configModel.rooms.min = 1;
        configModel.yearConstruction.min = 1800;
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
          }
          observer.next(true);
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
    set(dataModel, 'addressStreetCode', get(f, 'id', null));
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
    addressPostalCode.setValue(postCode);
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
              let id = get(dV, 'id', '');
              try {
                id = id.toString().toLowerCase();
              } catch (e) {
                id = null;
              }
              return (
                name.includes(keywords.toLowerCase()) ||
                id.includes(keywords.toLowerCase())
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

  processFormModel(formGroupValue, existingModel?: Locuinte): Locuinte {
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
        case 'addressApart':
        case 'addressCity':
        case 'addressCounty':
        case 'name':
        case 'addressBuildingNumber':
        case 'addressScara':
        case 'addressPostalCode':
        case 'addressStreet':
        case 'addressStreetType':
          set(newModel, key, val);
          break;
        case 'yearConstruction':
          val ? set(newModel, key, parseInt(val, 10)) : set(newModel, key, val);
          break;
        case 'hasAlarmSystem':
        case 'floors':
        case 'typeUse':
        case 'rooms':
        case 'area':
        case 'valueCurrency':
        case 'value':
          set(newModel, key, val);
          break;
        case 'structure':
          set(newModel, key, val);
          break;
        case 'type':
          set(newModel, key, val);
          break;

        case 'valueCurrency':
          set(newModel, key, val);
          break;
        case 'padAvailable':
        case 'padNr':
        case 'padSerie':
          set(newModel, key, val);
          break;

        case 'addressStreetType':
        case 'addressCountyCode':
        case 'addressStreetCode':
        case 'addressCityCode':
          // Ignore.
          break;
        default:
          set(newModel, key, val);
          break;
      }
    });
    return newModel;
  }
}
