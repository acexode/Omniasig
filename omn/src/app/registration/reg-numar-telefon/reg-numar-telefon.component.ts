import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-reg-numar-telefon',
  templateUrl: './reg-numar-telefon.component.html',
  styleUrls: ['./reg-numar-telefon.component.scss'],
})
export class RegNumarTelefonComponent implements OnInit {
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

  reg(){
 this.router.navigate(['registration/confirm-number',this.teleForm.controls['phoneNumber'].value])
  }
}