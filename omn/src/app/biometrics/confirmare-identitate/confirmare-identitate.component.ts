import { LocuinteService } from './../../profile/pages/locuinte/services/locuinte/locuinte.service';
import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import {Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { selectConfigHelper } from 'src/app/shared/data/select-config-helper';
import { autoCompleteConfigHelper } from 'src/app/shared/data/autocomplete-config-helper';
import { inputConfigHelper } from 'src/app/shared/data/input-config-helper';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CnpPipe } from 'src/app/shared/pipes/cnp.pipe';
import { ValidateCNP } from './cnp-validator';
@Component({
  selector: 'app-confirmare-identitate',
  templateUrl: './confirmare-identitate.component.html',
  styleUrls: ['./confirmare-identitate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmareIdentitateComponent implements OnInit {
  private confirmareForm : FormGroup; 
  buttonText = "Continuă"
  streets$ = this.locuintS.streetStore$;
  counties = []
  cities=[]
  streets= []
  confirmModel = {    
    name: inputConfigHelper({
      label: 'Nume',
      type: 'text',
      placeholder: '', 
    }),    
    lastname: inputConfigHelper({
      label: 'Prenume',
      type: 'text',
      placeholder: '',      
    }),
    cnp: inputConfigHelper({
      label: 'CNP',
      type: 'text',
      placeholder: '',      
    }),
    date: inputConfigHelper({
      label: 'Data nașterii',
      type: 'text',
      placeholder: '',      
    }),
    addressCounty: selectConfigHelper({ label: 'Județ'}),
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
  
  
  constructor(private formBuilder: FormBuilder,protected locuintS: LocuinteService,private cdRef: ChangeDetectorRef,) { 
    
      this.confirmareForm =  this.formBuilder.group({
        name: ['', Validators.required],
        lastname: ['', Validators.required],
        cnp: ['', [ValidateCNP ]],
        date: ['', Validators.required],
        addressCounty: ['', Validators.required],
        addressCity: ['', Validators.required],
        addressStreet: ['', Validators.required],
        addressBuildingNumber: ['', Validators.required],
        addressFloor: ['', Validators.required],
        addressApart: ['', Validators.required],
        addressPostalCode: ['', Validators.required],
        accept: [false, Validators.required],
        
      });
  }

  ngOnInit() {
    this.locuintS.getCounties().subscribe((val:any) => {
      this.counties = val      
    });
    this.confirmareForm.get('addressCounty').valueChanges.subscribe((val) => {
      this.locuintS.getCities(val).subscribe((data:any) => {          
        this.cities = data;
      });
    });
    this.confirmareForm.get('addressCity').valueChanges.subscribe((val) => {
      const addressCity = this.cities.filter((v) => v.id === val)[0];
      console.log(this.cities)
      console.log(addressCity)
        const obj = {
          countryId: addressCity.countryId,
          countyId: addressCity.countyId,
          cityId: addressCity.id,
          postCode: null,
          statedId: addressCity.statedId,
        };
        this.locuintS.getStreets(obj).subscribe((v) => {
          this.streets= v
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
  
  submitForm(){
    console.log(this.confirmareForm.value)
  }
   validateCNP (value) {
    var re = /^\d{1}\d{2}(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])(0[1-9]|[1-4]\d| 5[0-2]|99)\d{4}$/,
      bigSum = 0,
      rest = 0,
      ctrlDigit = 0,
      control:any = '279146358279',
      i = 0;
    if (re.test(value)) {
      for (i = 0; i < 12; i++) {
        bigSum += value[i] * control[i];
      }
      ctrlDigit = bigSum % 11;
      if (ctrlDigit === 10) {
        ctrlDigit = 1;
      }
  
      if (ctrlDigit !== parseInt(value[12], 10)) {
        return false;
      } else {
        return true;
      }
    }
    return false;
  };
  
}
 
