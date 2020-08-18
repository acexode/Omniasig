import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
})
export class PasscodeComponent implements OnInit {
  input: string = '';
  min: string = '00'
  sec: any = 59;
  digits: number = null;
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {

  }

   changeInput(_: any) {
    if (this.digits) {
      this.digitsLength = this.digits.toString().length
    }
    if (this.digitsLength > 5) {
      this.verifyDigit()
    }
  }

  verifyDigit() {
    this.navCtrl.navigateRoot("/home")
  }

  spawnInput(){
   this.inputField.getInputElement().then((input) => {
     input.focus();
     input.click()
   })
   
  }
}
