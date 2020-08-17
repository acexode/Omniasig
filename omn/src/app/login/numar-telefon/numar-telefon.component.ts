import { IonInputConfig } from './../../shared/models/component/ion-input-config';
import { Component, OnInit } from '@angular/core';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-numar-telefon',
  templateUrl: './numar-telefon.component.html',
  styleUrls: ['./numar-telefon.component.scss'],
})
export class NumarTelefonComponent implements OnInit {
  asigTitle: IonTextItem = {
    text: 'Numărul tău de telefon',
    classes: 'color-white link-small',
    color: 'omn-transparent-white',
  };
  config: IonInputConfig= {
    // inputLabel:this.asigTitle,
    placeholder:"07XX XXX XXX",
    clearable:true, 
    inputClasses:"right-0",
    type:'tel',
    inputMode:"tel"
  }
  constructor() { }

  ngOnInit() {}

}
