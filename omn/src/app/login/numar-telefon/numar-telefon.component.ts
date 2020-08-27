import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { IonInputConfig } from './../../shared/models/component/ion-input-config';

@Component({
  selector: 'app-numar-telefon',
  templateUrl: './numar-telefon.component.html',
  styleUrls: ['./numar-telefon.component.scss'],
})
export class NumarTelefonComponent implements OnInit {
  label: IonTextItem = {
    text: 'Numărul tău de telefon',
    classes: 'link-small color-tertiary-grey w-100 bg-white pb-8',
    slot: 'end',
  };
  config: IonInputConfig = {
    placeholder: '07XX XXX XXX',
    type: 'tel',
    inputMode: 'tel',
    size: 100,
    inputLabel: this.label,
    clearable: true,
    inputClasses: 'ion-item-right',
    minLength:10,
    maxLength:10
  };
  teleForm: FormGroup;
  busy:boolean =false
  constructor(private router: Router, private formBuilder: FormBuilder,private auth:AuthService) {}

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.teleForm = this.formBuilder.group({
      phoneNumber: [
        '',
        [
          Validators.required,
          Validators.pattern(/^07[0-9].*$/),
          Validators.minLength(10),
        ],
      ],
    });
  }

  login() {
    this.busy=true
    this.auth.findUserByPhoneNumber(this.teleForm.controls["phoneNumber"].value).subscribe(
      data => {
       this.checkFirstLogin(this.teleForm.controls["phoneNumber"].value)
      },
      error =>{
        if (error.status == 400) {
          this.router.navigate([
            'registration/confirm-number',
            this.teleForm.controls['phoneNumber'].value,
          ]);
        }
      },
      ()=> this.busy =false
    );
  }

  checkFirstLogin(enterNumber){
    this.auth.checkFirstLogin().subscribe(
      phoneNumber=>{
        if (phoneNumber == enterNumber) {
          this.router.navigate([
            'login/verify',
            this.teleForm.controls['phoneNumber'].value,
          ]);
        }else{
        this.requestSms(enterNumber)
        }
      }
    )
  }

requestSms(phoneNumber){
  this.router.navigate([
    'login/authenticate',
    this.teleForm.controls['phoneNumber'].value,
  ]);
  
}

}
