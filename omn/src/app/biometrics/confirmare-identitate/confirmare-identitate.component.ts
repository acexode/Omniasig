import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonContent, NavController } from '@ionic/angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { autoCompleteConfigHelper } from 'src/app/shared/data/autocomplete-config-helper';
import { dateTimeConfigHelper } from 'src/app/shared/data/datetime-config-helper';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { selectConfigHelper } from 'src/app/shared/data/select-config-helper';
import { AuthService } from './../../core/services/auth/auth.service';
import { LocuinteService } from './../../profile/pages/locuinte/services/locuinte/locuinte.service';
import { cnpValidator } from 'src/app/shared/validators/cnp-validator';
@Component({
  selector: 'app-confirmare-identitate',
  templateUrl: './confirmare-identitate.component.html',
  styleUrls: ['./confirmare-identitate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmareIdentitateComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  confirmareForm: FormGroup;
  buttonText = 'Continuă';
  userId;
  streets$ = this.locuintS.streetStore$;
  cnpInvalid = false;
  counties = [];
  cities = [];
  streets = [];
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
    dateOfBirth: dateTimeConfigHelper({
      label: 'Data nașterii',
      displayFormat: 'YYYY-MM-DD',
      pickerFormat: '',
    }),
    addressCounty: selectConfigHelper({ label: 'Județ' }),
    addressCity: selectConfigHelper({
      label: 'Localitate',
    }),
    addressStreet: autoCompleteConfigHelper({
      label: 'Strada',
      disabled: false,
      dataServiceCb: this.streetLookup,
      dataServiceSource: this.streets$,
    }),
    addressBuildingNumber: inputConfigHelper({
      label: 'Număr',
      type: 'text',
      placeholder: '',
    }),
    addressFloor: inputConfigHelper({
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
    private navCtrl: NavController,
    private cdRef: ChangeDetectorRef,
    private auth: AuthService
  ) {
    this.confirmareForm = this.formBuilder.group({
      name: ['', Validators.required],
      surname: ['', Validators.required],
      cnp: this.formBuilder.control(null, [Validators.required, cnpValidator]),
      dateOfBirth: ['', Validators.required],
      addressCounty: ['', Validators.required],
      addressCity: ['', Validators.required],
      addressStreet: ['', Validators.required],
      addressBuildingNumber: ['', Validators.required],
      addressFloor: ['', Validators.required],
      addressApart: ['', Validators.required],
      addressPostalCode: [null, Validators.required],
      accept: [false, Validators.required],
    });
  }

  ngOnInit() {
    this.locuintS.getCounties().subscribe((val: any) => {
      this.counties = val;
    });
    this.confirmareForm.get('addressCounty').valueChanges.subscribe((val) => {
      this.locuintS.getCities(val).subscribe((data: any) => {
        this.cities = data;
      });
    });
    this.confirmareForm.get('addressCity').valueChanges.subscribe((val) => {
      const addressCity = this.cities.filter((v) => v.id === val)[0];
      const obj = {
        countryId: addressCity.countryId,
        countyId: addressCity.countyId,
        cityId: addressCity.id,
        postCode: null,
        statedId: addressCity.statedId,
      };
      this.locuintS.getStreets(obj).subscribe((v) => {
        this.cdRef.markForCheck();
      });
    });
  }

  streetLookup(
    input: any,
    source?: BehaviorSubject<any>
  ): Observable<Array<any>> {
    if (source && source instanceof BehaviorSubject) {
      return source.pipe(
        map((data) => {
          // Filter whole list in here based on text input.
          return data;
        })
      );
    } else {
      return of([]);
    }
  }

  submitForm() {
    let { value } = this.confirmareForm;
    if (this.verificaCNP(value.cnp)) {
      this.formSubmitting = true;
      this.auth.lastLoginNumber().subscribe((e) => {
        this.userId = e;
        const user = {
          userNameOrId: this.userId,
          name: value.name,
          cnp: value.cnp,
          surname: value.surname,
          dateOfBirth: value.dateOfBirth,
        };
        const locuinte: any = {
          name: 'Domiciliu',
          addressApart: value.addressApart,
          addressBuildingNumber: value.addressBuildingNumber,
          addressCity: value.addressCity,
          addressCounty: value.addressCounty,
          addressFloor: value.addressFloor,
          addressPostalCode: value.addressPostalCode,
          addressStreet: value.addressStreet,
        };
        this.auth.updateUserProfile(user).subscribe((e) => {
          this.locuintS.addSingleLocuinte(locuinte).subscribe((e) => {
            this.navCtrl.navigateRoot('/home');
          });
        });
      });
    } else {
      this.cnpInvalid = true;
      setTimeout(() => {
        this.cnpInvalid = false;
      }, 3000);
      this.scrollTop();
    }
  }
  scrollTop() {
    if (this.cnpRef) {
      this.cnpRef.scrollToTop(500);
    }
  }

  verificaCNP(control) {
    if (control) {
      var re = /^\d{1}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d| 5[0-2]|99)\d{4}$/,
        bigSum = 0,
        rest = 0,
        ctrlDigit = 0,
        controlNum: any = '279146358279',
        i = 0;
      console.log(re.test(control));
      if (re.test(control)) {
        for (i = 0; i < 12; i++) {
          bigSum += control[i] * controlNum[i];
        }
        ctrlDigit = bigSum % 11;
        if (ctrlDigit === 10) {
          ctrlDigit = 1;
        }
        if (ctrlDigit !== parseInt(control[12], 10)) {
          return false;
        } else {
          return true;
        }
      }
      return false;
    }
    return null;
  }

  get cnp() {
    return this.confirmareForm.get('cnp');
  }
}
