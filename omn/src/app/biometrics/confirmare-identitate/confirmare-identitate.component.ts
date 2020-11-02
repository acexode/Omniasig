import { genericErrorTexts } from './../../shared/data/generic-error-helper';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, NavController } from '@ionic/angular';
import { get } from 'lodash';
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocuinteFormService } from 'src/app/profile/pages/locuinte/services/locuinte-form/locuinte-form.service';
import { autoCompleteConfigHelper } from 'src/app/shared/data/autocomplete-config-helper';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { locuinteFieldsData } from 'src/app/shared/data/locuinte-field-data';
import { selectConfigHelper } from 'src/app/shared/data/select-config-helper';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { cnpValidator } from 'src/app/shared/validators/cnp-validator';
import { AuthService } from './../../core/services/auth/auth.service';
import { LocuinteService } from './../../profile/pages/locuinte/services/locuinte/locuinte.service';
@Component({
  selector: 'app-confirmare-identitate',
  templateUrl: './confirmare-identitate.component.html',
  styleUrls: ['./confirmare-identitate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmareIdentitateComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';

  headerConfig: SubPageHeader = {
    ...subPageHeaderPrimary(''),
    trailingIcon: null,
  };
  toggleStreetInput = null;
  confirmareForm: FormGroup;
  buttonText = 'Continuă';
  userId;
  streets$ = this.locuintS.streetStore$;
  city$ = this.locuintS.cityStore$;
  cnpInvalid = false;

  dataModel: any = { id: null };
  formData = {
    addressCounty: [],
    addressCity: [],
    addressStreet: [],
    addressStreetType: locuinteFieldsData.addressStreetType,
  };
  account = null;
  formSubmitting = false;
  @ViewChild('cnpRef', { static: true }) cnpRef: IonContent;
  confirmModel = {
    name: inputConfigHelper({
      label: 'Nume',
      type: 'text',
      placeholder: '',
      custom: {
        autoCapitalize: 'sentences',
      },
    }),
    surname: inputConfigHelper({
      label: 'Prenume',
      type: 'text',
      placeholder: '',
      custom: {
        autoCapitalize: 'sentences',
      },
    }),
    cnp: inputConfigHelper({
      label: 'CNP',
      type: 'text',
      placeholder: '',
      custom: {
        maxLength: 13,
        minLength: 13,
      },
    }),
    addressCounty: selectConfigHelper({
      label: 'Județ',
      idKey: 'name',
      labelKey: 'name',
    }),
    addressCity: autoCompleteConfigHelper({
      label: 'Localitate',
      disabled: false,
      dataServiceCb: this.locuinteF.cityLookup,
      dataServiceSource: this.locuinteF.city$,
      clearInvalid: true,
      idKey: 'name',
      labelKey: 'name'
    }),
    addressStreet: autoCompleteConfigHelper({
      label: 'Strada',
      disabled: false,
      dataServiceCb: this.locuinteF.streetLookup,
      dataServiceSource: this.locuinteF.streets$,
      clearInvalid: true,
      idKey: 'name',
      labelKey: 'name',
      detailAttribute: 'streetType',
    }),
    addressStreetType: selectConfigHelper({
      label: 'Tip strada',
      idKey: 'name',
      labelKey: 'name',
    }),
    addressName: inputConfigHelper({
      label: 'Nume strada',
      type: 'text',
      placeholder: 'Completează',
    }),
    addressStreetNumber: inputConfigHelper({
      label: 'Număr',
      type: 'text',
      placeholder: '',
    }),
    addressBuildingNumber: inputConfigHelper({
      label: 'Bloc (opțional)',
      type: 'text',
      placeholder: '',
    }),
    addressScara: inputConfigHelper({
      label: 'Scara (opțional)',
      type: 'text',
      placeholder: '',
    }),
    addressApart: inputConfigHelper({
      label: 'Apartament (opțional)',
      type: 'text',
      placeholder: '',
    }),
    addressPostalCode: inputConfigHelper({
      label: 'Cod poștal',
      type: 'number',
      placeholder: '',
      disabled: true,
      custom: {
        maxLength: 6,
        minLength: 6,
      },
    }),
  };
  errorMsgs = [];
  hasError = false;

  constructor(
    private formBuilder: FormBuilder,
    protected locuintS: LocuinteService,
    protected locuinteF: LocuinteFormService,
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private auth: AuthService
  ) {
    this.confirmareForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      cnp: this.formBuilder.control(null, [Validators.required, cnpValidator]),
      addressCounty: ['', Validators.required],
      addressCity: ['', Validators.required],
      addressStreet: ['', Validators.required],
      addressStreetType: [''],
      addressName: [''],
      addressStreetNumber: ['', Validators.required],
      addressBuildingNumber: [''],
      addressScara: [''],
      addressApart: [''],
      addressPostalCode: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      accept: [false, Validators.requiredTrue],
    });
  }

  ngOnInit() {
    this.auth.getAccountData().subscribe((v) => {
      if (v && this.confirmareForm) {
        this.account = v;
        this.confirmareForm.get('name').setValue(get(v, 'name', ''));
        this.confirmareForm.get('surname').setValue(get(v, 'surname', ''));
        this.confirmareForm.get('cnp').setValue(get(v, 'cnp', ''));
      }
    });
    if (this.addressCounty) {
      this.locuinteF
        .handleInitialCounty(this.addressCounty, this.formData)
        .pipe(
          switchMap((vals) => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            if (this.addressCity) {
              return this.locuinteF.handleInitialCityAndStreets(
                this.addressCounty,
                this.addressCity,
                this.formData
              );
            } else {
              return of(true);
            }
          })
        )
        .subscribe((v) => {
          // We need to clear the validator when we have no data on the initial call.
          this.toggleStreetInput =
            get(this.formData.addressStreet, 'length', 0) === 0;
          if (
            this.addressStreet &&
            !get(this.formData, 'addressStreet', [])?.length
          ) {
            this.addressStreet.clearValidators();
            if (this.toggleStreetInput) {
              this.addressStreet.updateValueAndValidity();
            }
          }
          if (this.addressStreet || this.addressName) {
            this.locuinteF.setInitialStreetValue(
              this.dataModel,
              this.addressStreet,
              this.addressName,
              this.formData
            );
          }
          this.cdRef.markForCheck();
          this.cdRef.detectChanges();
        });
      this.addressCounty.valueChanges.subscribe((val) => {
        if (this.addressCity) {
          this.addressCity.patchValue('');
          this.addressCity.updateValueAndValidity();
        }
        this.locuinteF
          .updateCounty(this.addressCounty, this.formData, this.dataModel)
          .subscribe((v) => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
            if (this.addressCity) {
              this.addressCity.updateValueAndValidity({
                onlySelf: true,
              });
            }
          });
      });
    }
    if (this.addressCity) {
      this.addressCity.valueChanges.subscribe((val) => {
        this.locuinteF.resetStreetFieldValues(
          this.addressStreet,
          this.addressName,
          this.addressStreetType,
          !this.toggleStreetInput,
          true
        );
        this.addressStreetType.disable();
        this.addressStreet.disable();
        this.cdRef.detectChanges();
        this.locuinteF
          .updateCity(this.addressCity, this.formData, this.dataModel)
          .subscribe((v) => {
            this.toggleStreetInput =
              get(this.formData.addressStreet, 'length', 0) === 0;
            if (v && v.length) {
              this.addressStreet.enable();
              this.locuinteF.resetStreetFieldValues(
                this.addressStreet,
                this.addressName,
                this.addressStreetType,
                !this.toggleStreetInput,
                true
              );
              this.locuinteF.handleStreetProcessing(
                val,
                this.formData,
                this.dataModel
              );
              this.locuinteF.handlePostalCode(
                null,
                this.formData,
                this.addressPostalCode,
                this.addressCity ? this.addressCity.value : null
              );
            } else {
              this.addressStreetType.enable();
              this.locuinteF.handlePostalCode(
                null,
                this.formData,
                this.addressPostalCode,
                this.addressCity ? this.addressCity.value : null
              );
              this.locuinteF.resetStreetFieldValues(
                this.addressStreet,
                this.addressName,
                this.addressStreetType,
                !this.toggleStreetInput,
                true
              );
            }
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
          });
      });
    }
    if (this.addressStreet) {
      this.addressStreet.valueChanges.subscribe((val) => {
        this.locuinteF.handleStreetProcessing(
          val,
          this.formData,
          this.dataModel
        );

        this.locuinteF.handlePostalCode(
          val,
          this.formData,
          this.addressPostalCode,
          this.addressCity ? this.addressCity.value : null
        );
      });
    }
  }

  submitForm() {
    const value = this.confirmareForm.getRawValue();
    if (this.confirmareForm.valid) {
      this.formSubmitting = true;
      this.auth.lastLoginNumber().subscribe((e) => {
        this.userId = e;
        const user = {
          userNameOrId: this.userId,
          name: value.name,
          cnp: value.cnp,
          surname: value.surname,
        };
        const locuinteModel = this.locuinteF.processFormModel(
          this.confirmareForm.getRawValue(),
          this.dataModel,
          this.toggleStreetInput
        );
        const locuinte: any = {
          ...locuinteModel,
          ...{
            name: 'Domiciliu',
            isHomeAddress: true,
          },
        };

        let obsv = of(true);
        try {
          if (this.cnp.value !== this.account.cnp) {
            obsv = this.auth.checkCNP(this.cnp.value, e);
          }
        } catch {}
        obsv
          .pipe(
            switchMap((v) => {
              return this.auth.updateUserProfile(user);
            }),
            switchMap(() => {
              return this.locuintS.addSingleLocuinte({
                ...locuinte,
                ...this.dataModel,
              });
            }),
            switchMap(() => {
              return this.auth.refreshProfile();
            })
          )
          .subscribe(
            () => {
              this.navCtrl.navigateRoot('/home');
            },
            (err) => {
              this.errorMsgs = genericErrorTexts(
                err
                  ? get(err, 'error', 'A fost identificată o problemă...')
                  : 'A fost identificată o problemă...',
                ''
              );
              this.hasError = true;
              this.cdRef.markForCheck();
            },
            () => {
              this.formSubmitting = false;
              this.cdRef.markForCheck();
            }
          );
      });
    } else {
      this.confirmareForm.updateValueAndValidity();
      this.scrollTop();
    }
  }
  get addressCounty() {
    return this.confirmareForm
      ? this.confirmareForm.get('addressCounty')
      : null;
  }

  get addressCity() {
    return this.confirmareForm ? this.confirmareForm.get('addressCity') : null;
  }

  get addressStreetType() {
    return this.confirmareForm
      ? this.confirmareForm.get('addressStreetType')
      : null;
  }

  get addressStreet() {
    return this.confirmareForm
      ? this.confirmareForm.get('addressStreet')
      : null;
  }
  get addressName() {
    return this.confirmareForm ? this.confirmareForm.get('addressName') : null;
  }
  get addressPostalCode() {
    return this.confirmareForm
      ? this.confirmareForm.get('addressPostalCode')
      : null;
  }

  scrollTop() {
    if (this.cnpRef) {
      this.cnpRef.scrollToTop(500);
    }
  }

  get cnp() {
    return this.confirmareForm.get('cnp');
  }
  clearErrors() {
    this.hasError = false;
    this.errorMsgs = [];
    this.formSubmitting = false;
    this.cdRef.markForCheck();
  }
}
