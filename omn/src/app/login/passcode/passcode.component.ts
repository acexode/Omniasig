import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
})
export class PasscodeComponent implements OnInit {
  min: string = '00'
  sec: any = 59;
   digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  passForm: FormGroup;
  constructor(private navCtrl: NavController,private formBuilder: FormBuilder) { }

  ngOnInit() {
this.initForm()
  }
  initForm(){
    this.passForm = this.formBuilder.group({
      passcode: ['', [Validators.required,Validators.minLength(6),Validators.maxLength(6)]],
  });

  this.passForm.valueChanges.subscribe((value)=>{
    this.changeInput(value.passcode)   
  })
  }

   changeInput(passcode) {
    if (passcode) {
      this.digitsLength = passcode.toString().length
    }
    if (this.digitsLength > 5) {
      this.verifyPasscode()
    }
  }

  verifyPasscode() {
    this.navCtrl.navigateRoot("/home")
  }

  spawnInput(){
   this.inputField.getInputElement().then((input) => {
     input.focus();
     input.click()
   })
  }

}
