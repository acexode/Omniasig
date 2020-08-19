import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-input-sms',
  templateUrl: './input-sms.component.html',
  styleUrls: ['./input-sms.component.scss'],
})
export class InputSmsComponent implements OnInit, AfterViewInit, OnDestroy {
  input: string = '';
  min: string = '00'
  sec: any = 59;
  digits: number = null;
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription
  phoneNumber = null
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.getPhoneNumber()
  }

  getPhoneNumber() {
    this.sub = this.route.params.subscribe((params) => {
    if (params.number) {
      this.phoneNumber = params.number
    }else{
      this.router.navigate(["/login"])
    }
    })
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
    this.router.navigate(["login/verfiy"])
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
      input.click()
    })

  }

  ngOnDestroy() {
    this.sub.unsubscribe()
  }
}
