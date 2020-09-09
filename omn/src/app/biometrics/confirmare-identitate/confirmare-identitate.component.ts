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
import { NavController } from '@ionic/angular';
import { dateTimeConfigHelper } from 'src/app/shared/data/datetime-config-helper';
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
  formSubmitting = false
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
      type: 'number',
      placeholder: '', 
      custom: {
        maxLength: 13,
        minLength: 13,
      },     
    }),
    dateOfBirth: dateTimeConfigHelper({
      label: 'Data nașterii',     
      displayFormat: 'YYYY-MM-DD',
      pickerFormat:''    
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
  
  
  constructor(private formBuilder: FormBuilder,protected locuintS: LocuinteService,private navCtrl: NavController,private cdRef: ChangeDetectorRef,) { 
    
      this.confirmareForm =  this.formBuilder.group({
        name: ['', Validators.required],
        surname: ['', Validators.required],
        cnp: [null, Validators.required],
        dateOfBirth: ['', Validators.required],
        addressCounty: ['', Validators.required],
        addressCity: ['', Validators.required],
        addressStreet: ['', Validators.required],
        addressBuildingNumber: ['', Validators.required],
        addressFloor: ['', Validators.required],
        addressApart: ['', Validators.required],
        addressPostalCode: [null, Validators.required],
        accept: [false, Validators.required]        
      });
  }

  ngOnInit() {
    console.log(this.confirmareForm)
    this.confirmareForm.get('cnp').valueChanges.subscribe(v=>{
      console.log(v)
    })
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
    let {value}= this.confirmareForm  
    console.log(this.verificaCNP(value.cnp))
    if(this.verificaCNP(value.cnp)){
      let user = {    
      name: value.name,
      cnp: value.cnp,
      surname: value.surname,
      dateOfBirth: value.dateOfBirth
      }
      let locuinte:any = {
        name: "Domiciliu",
        addressApart: value.addressApart,
        addressBuildingNumber: value.addressBuildingNumber,
        addressCity: value.addressCity,
        addressCounty: value.addressCounty,
        addressFloor: value.addressFloor,
        addressPostalCode: value.addressPostalCode,
        addressStreet: value.addressStreet,
      }
      this.locuintS.updateUserProfile(user).subscribe(e =>{
        this.locuintS.addSingleLocuinte(locuinte).subscribe(e =>{
          this.navCtrl.navigateRoot('/home');
        })
      })
      console.log(user)
      console.log(locuinte)
    }else{

    }  
  }
  
  verificaCNP(control) {
    let cnp = control.value
    if (!cnp) {    
    return false;
    }
    console.log(cnp)
    cnp = cnp.split("");
    let suma = cnp[0]*2+cnp[1]*7+cnp[2]*9+cnp[3]*1+cnp[4]*4+cnp[5]*6+cnp[6]*3+cnp[7]*5+cnp[8]*8+cnp[9]*2+cnp[10]*7+cnp[11]*9;
    if (suma%11 < 10 && suma%11 == cnp[12]) {
      console.log(true)
      return { 'Codul Numeric Personal este valid': true }
    
    } else {
    return {"Codul Numeric Personal este invalid!": false};
    }
  }
   
  
}
 
