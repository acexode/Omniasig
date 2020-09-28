import { get } from 'lodash';
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
import { of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { LocuinteFormService } from 'src/app/profile/pages/locuinte/services/locuinte-form/locuinte-form.service';
import { autoCompleteConfigHelper } from 'src/app/shared/data/autocomplete-config-helper';
import { dateTimeConfigHelper } from 'src/app/shared/data/datetime-config-helper';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
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
  confirmareForm: FormGroup;
  buttonText = 'Continuă';
  userId;
  streets$ = this.locuintS.streetStore$;
  cnpInvalid = false;

  dataModel = {};
  formData = {
    addressCounty: [],
    addressCity: [],
    addressStreet: [],
  };

  formSubmitting = false;
  @ViewChild('cnpRef', { static: true }) cnpRef: IonContent;
  confirmModel = {
    name: inputConfigHelper({
      label: 'Nume',
      type: 'text',
      placeholder: '',
    }),
    surname: inputConfigHelper({
      label: 'Prenume',
      type: 'text',
      placeholder: '',
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
    addressCity: selectConfigHelper({
      label: 'Localitate',
      idKey: 'name',
      labelKey: 'name',
    }),
    addressStreet: autoCompleteConfigHelper({
      label: 'Strada',
      disabled: false,
      dataServiceCb: this.locuinteF.streetLookup,
      dataServiceSource: this.locuinteF.streets$,
      idKey: 'name',
      labelKey: 'name',
    }),
    addressBuildingNumber: inputConfigHelper({
      label: 'Număr',
      type: 'text',
      placeholder: '',
    }),
    addressScara: inputConfigHelper({
      label: 'Scara (opțional)',
      type: 'text',
      placeholder: '',
    }),
    addressApart: inputConfigHelper({
      label: 'Apartament',
      type: 'text',
      placeholder: '',
    }),
    addressPostalCode: inputConfigHelper({
      label: 'Cod poștal',
      type: 'number',
      placeholder: '',
      custom: {
        maxLength: 6,
        minLength: 6,
      },
    }),
  };

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
      addressBuildingNumber: ['', Validators.required],
      addressScara: [''],
      addressApart: ['', Validators.required],
      addressPostalCode: [
        null,
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      accept: [false, Validators.required],
    });
    this.auth.getAccountData().subscribe((v) => {
      if (v && this.confirmareForm) {
        this.confirmareForm.get('name').setValue(get(v, 'name', ''));
        this.confirmareForm.get('surname').setValue(get(v, 'surname', ''));
        this.confirmareForm.get('cnp').setValue(get(v, 'cnp', ''));
      }
    });
  }

  ngOnInit() {
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
          this.cdRef.markForCheck();
          this.cdRef.detectChanges();
        });
      this.addressCounty.valueChanges.subscribe((val) => {
        if (this.addressCity.value) {
          this.addressCity.patchValue({}, { emit: true });
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
        if (this.addressStreet.value) {
          this.addressStreet.patchValue({}, { emit: true });
        }
        this.locuinteF
          .updateCity(this.addressCity, this.formData, this.dataModel)
          .subscribe((v) => {
            this.cdRef.markForCheck();
            this.cdRef.detectChanges();
          });
      });
    }
    if (this.addressStreet) {
      this.addressStreet.valueChanges.subscribe((val) => {        
        if (this.addressStreet) {
          this.addressStreet.valueChanges.subscribe((val) => {
            let {addressStreet} = this.formData
            if(addressStreet.length){
              this.locuinteF.handleStreetProcessing(
                val,
                this.formData,
                this.dataModel
              );
              this.locuinteF.handlePostalCode(
                val,
                this.formData,
                this.addressPostalCode
              );    
              this.addressPostalCode.disable()      
            }else{
              this.addressStreet.clearValidators()              
              this.addressPostalCode.clearValidators()
              this.addressPostalCode.disable()
            }
          });
        }
      });
    }
  }

  submitForm() {
    const value = this.confirmareForm.value;
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
        const locuinte: any = {
          name: 'Domiciliu',
          addressApart: value.addressApart,
          addressBuildingNumber: value.addressBuildingNumber,
          addressCity: value.addressCity,
          addressCounty: value.addressCounty,
          addressScara: value.addressScara,
          addressPostalCode: value.addressPostalCode,
          addressStreet: value.addressStreet,
          isHomeAddress: true,
        };
        this.auth
          .updateUserProfile(user)
          .pipe(
            switchMap(() => {
              return this.locuintS.addSingleLocuinte(locuinte);
            }),
            switchMap(() => {
              return this.auth.refreshProfile();
            })
          )
          .subscribe(() => {
            this.navCtrl.navigateRoot('/home');
          });
      });
    } else {
      this.confirmareForm.updateValueAndValidity();
      this.scrollTop();
    }
  }

  get addressCounty() {
    return this.confirmareForm && this.confirmareForm
      ? this.confirmareForm.get('addressCounty')
      : null;
  }

  get addressCity() {
    return this.confirmareForm && this.confirmareForm
      ? this.confirmareForm.get('addressCity')
      : null;
  }

  get addressStreet() {
    return this.confirmareForm && this.confirmareForm
      ? this.confirmareForm.get('addressStreet')
      : null;
  }
  get addressPostalCode() {
    return this.confirmareForm && this.confirmareForm
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
}
