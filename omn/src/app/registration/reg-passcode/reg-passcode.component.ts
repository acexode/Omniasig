import { Router } from '@angular/router';
import { RegistrationService } from './../../core/services/auth/registration.service';
import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-reg-passcode',
  templateUrl: './reg-passcode.component.html',
  styleUrls: ['./reg-passcode.component.scss'],
})
export class RegPasscodeComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  errorLogin: string | boolean = null;
  passForm: FormGroup
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private regService: RegistrationService,
    private router: Router
  ) {
    this.checkUserObj();
  }

  ngOnInit() {
  }

  checkUserObj() {
    if (
      !this.regService.getuserObj?.phoneNumber ||
      !this.regService.getuserObj?.userName
    ) {
      this.router.navigate(['/registration']);
    }
  }

  verifyPasscode(passForm: FormGroup) {
    let passcode: string = passForm.get('passcode').value;
    if (passcode == '000000') {
      this.errLogin(passForm)
    } else {
      this.regService.setUserObj({
        pin: passcode,
      });
      this.navCtrl.navigateRoot(`registration/confirm-passcode`);
    }
  }

  errLogin(passForm) {
    console.log("pass");
    if (!this.errorLogin) {

    } else {

      this.clearErr();
    }
  }

  clearErr() {
    //   this.errorLogin = nullio
    // passForm.reset();
    this.errorLogin = 'Codul este prea simplu.'
  }

}
