import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { subPageHeaderPrimary } from 'src/app/shared/data/sub-page-header-primary';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-cnp-digits',
  templateUrl: './cnp-digits.component.html',
  styleUrls: ['./cnp-digits.component.scss'],
})
export class CnpDigitsComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Introduceti CNP-ul')
  label:IonTextItem={
    text:"CNP",
    classes:"link-small color-tertiary-grey w-100 bg-white pb-8",
    slot:'end'
  }
  config: IonInputConfig = {
    placeholder: "1234567890123",
    type: 'number',
    inputMode: 'number',
    size:100,
    inputLabel:this.label,
    minLength:13,
    clearable:true,
  }
  cnpForm: FormGroup;
  constructor(private router: Router,private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.initForm()
  }

initForm(){
  this.cnpForm = this.formBuilder.group({
    cnp: ['', [Validators.required,Validators.minLength(13)]],
});
}

continue(){
 this.router.navigate(['reset-pincode/verify-passcode'])
  }
}