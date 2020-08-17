import { Component, OnInit, Input } from '@angular/core';
import { EnumCesiuneItem } from './../models/cesiune-item'
import { FormGroup, FormArray, FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { get } from 'lodash';
import { IonInputConfig } from '../../../../shared/models/component/ion-input-config'

@Component({
  selector: 'app-cesiune-form',
  templateUrl: './cesiune-form.component.html',
  styleUrls: ['./cesiune-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CesiuneFormComponent,
      multi: true,
    },
  ],
})
export class CesiuneFormComponent implements OnInit {
  @Input() config: IonInputConfig;

  radioValue: boolean = false;
  numberOfItems: number = 1;
  cesuineItems: EnumCesiuneItem[]

  public userForm: FormGroup;
  censionar: FormArray;
  
  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      censionar: this.fb.array([ this.createItem() ])
    });
  }
  
   createItem(): FormGroup {
      return this.fb.group({
        cui: '',
        procent: '',
        denumireCesionar: ''
      });
   }

  increaseItems(){
    const max = get(this.config, 'max', 2);
    const step = get(this.config, 'step', 1);
    if(this.numberOfItems < 2 && this.numberOfItems!== 2){
      this.censionar = this.userForm.get('censionar') as FormArray;
      this.censionar.push(this.createItem());

      this.numberOfItems++
    }
  }

  decreaseItems(){
    const min = get(this.config, 'min', 1);
    const step = get(this.config?.spinnerConfig?.step, 'step', 1);
    if(this.numberOfItems > 1){
      this.numberOfItems--
      this.censionar.removeAt(this.numberOfItems);
    }
  }

  get itemControls() {
    return this.userForm.get('censionar')['controls'];
  }


  radioHandler(event: any){
    event.target.value === "da"? this.radioValue = true : this.radioValue = false
  }

  onSubmit(){
    this.cesuineItems = this.userForm.value
  }

  ngOnInit() {

  }
}
