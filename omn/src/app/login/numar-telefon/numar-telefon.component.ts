import { IonInputConfig } from './../../shared/models/component/ion-input-config';
import { Component, OnInit } from '@angular/core';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { FormControl } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-numar-telefon',
  templateUrl: './numar-telefon.component.html',
  styleUrls: ['./numar-telefon.component.scss'],
})
export class NumarTelefonComponent implements OnInit {
  phoneNumber:string =''
  config: IonInputConfig = {
    placeholder: "07XX XXX XXX",
    type: 'tel',
    inputMode: 'tel',
  }
  validNumber:boolean =false
  constructor(private navCtrl: NavController) { }

  ngOnInit() { }

  changeInput(){
    console.log(this.phoneNumber);
    
    var regExp = /^07[0-9].*$/
  this.validNumber = regExp.test(this.phoneNumber) && this.phoneNumber.length > 9
  }

  login(){
 this.navCtrl.navigateRoot("login/authenticate")
  }

  clearInput(){
    this.phoneNumber = ''
  }

}
