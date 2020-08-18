import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-input-sms',
  templateUrl: './input-sms.component.html',
  styleUrls: ['./input-sms.component.scss'],
})
export class InputSmsComponent implements OnInit, AfterViewInit {
  input: string = '';
  min: string = '00'
  sec: any = 59;
  digits: number = null;
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  constructor(private navCtrl: NavController) { }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.startTimer()
  }

  startTimer() {
    let timer = setInterval(() => {
      if (this.sec < 1 || this.sec == 0) {
        clearInterval(timer)
        this.sec = '00'
        return;
      }
      this.sec--
    }, 999);
  }

  resendSMS() {
    this.digits = null
    this.sec = 59;
    this.startTimer()
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
    this.navCtrl.navigateRoot("login/verfiy")
  }

  spawnInput(){
   this.inputField.getInputElement().then((input) => {
     input.focus();
     input.click()
   })
   
  }
}
