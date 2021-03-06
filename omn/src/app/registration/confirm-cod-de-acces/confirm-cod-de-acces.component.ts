import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { RegistrationService } from './../../core/services/auth/registration.service';

@Component({
  selector: 'app-confirm-cod-de-acces',
  templateUrl: './confirm-cod-de-acces.component.html',
  styleUrls: ['./confirm-cod-de-acces.component.scss'],
})
export class ConfirmCodDeAccesComponent implements OnInit {
  digitsLength = 0;
  @HostBinding('class') color = 'ion-color-white-page';
  passForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    private regService: RegistrationService
  ) {
    this.checkUserObj();
  }

  ngOnInit() {}

  checkUserObj() {
    if (
      !this.regService.getuserObj?.phoneNumber ||
      !this.regService.getuserObj?.userName ||
      !this.regService.getuserObj?.pin
    ) {
      this.router.navigate(['/registration']);
    }
  }

  verifyPasscode( passForm: FormGroup ) {
    if (passForm.get('passcode').value === this.regService.getuserObj.pin) {
      this.navCtrl.navigateRoot(`registration/personal-details`);
    } else {
      this.navCtrl.navigateBack(['/registration', 'create-passcode']);
    }
  }
}
