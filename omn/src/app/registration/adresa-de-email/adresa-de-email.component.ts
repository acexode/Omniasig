import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subPageHeaderCustom } from 'src/app/shared/data/sub-page-header-custom';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-adresa-de-email',
  templateUrl: './adresa-de-email.component.html',
  styleUrls: ['./adresa-de-email.component.scss'],
})
export class AdresaDeEmailComponent implements OnInit {
  label:IonTextItem={
    text:"Email",
    classes:"link-small color-tertiary-grey w-100 bg-white pb-8",
    slot:'end'
  }
  config: IonInputConfig = {
    placeholder: "",
    type: 'email',
    inputMode: 'email',
    size:100,
    inputLabel:this.label,
    clearable:false,
    inputClasses:"ion-item-right"
  }
  emailForm: FormGroup;
  headerConfig = subPageHeaderDefault('');
  constructor(private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.initForm()
  }

initForm(){
  this.emailForm = this.formBuilder.group({
    email: ['', [Validators.required,Validators.email,Validators.minLength(4)]],
});
}

proceed(){
 this.router.navigate(['registration/account-created'])
  }


}