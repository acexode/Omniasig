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

  verifyPasscode(passForm:FormGroup) {
    this.regService.setUserObj({
      pin: passForm.get('passcode').value,
    });
    this.navCtrl.navigateRoot(`registration/confirm-passcode`);
  }

}
