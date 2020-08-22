import { Router } from '@angular/router';
import { IonInputConfig } from './../../shared/models/component/ion-input-config';
import { Component, OnInit } from '@angular/core';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-numar-telefon',
  templateUrl: './numar-telefon.component.html',
  styleUrls: ['./numar-telefon.component.scss'],
})
export class NumarTelefonComponent implements OnInit {
  label:IonTextItem={
    text:"Numărul tău de telefon",
    classes:"link-small color-tertiary-grey w-100 bg-white pb-8",
    slot:'end'
  }
  config: IonInputConfig = {
    placeholder: "07XX XXX XXX",
    type: 'tel',
    inputMode: 'tel',
    size:100,
    inputLabel:this.label,
    clearable:true,
    inputClasses:"ion-item-right"
  }
  teleForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.initForm()
  }

initForm(){
  this.teleForm = this.formBuilder.group({
    phoneNumber: ['', [Validators.required,Validators.pattern(/^07[0-9].*$/),Validators.minLength(9)]],
});
}

  login(){
 this.router.navigate(['login/authenticate',this.teleForm.controls['phoneNumber'].value])
  }


}
