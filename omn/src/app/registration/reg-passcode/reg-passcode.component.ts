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
  digitsLength = 0;
  @HostBinding('class') color = 'ion-color-white-page';
  @ViewChild('inputField') inputField: IonInput;
  passForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private regService: RegistrationService,
    private router:Router
  ) {
    this.checkUserObj()
   }

  ngOnInit() {
    this.initForm();
  }

  checkUserObj() {
    if (!this.regService.getuserObj?.phoneNumber || !this.regService.getuserObj?.userName) {
      this.router.navigate(["/registration"])
    }
  }

  initForm() {
    this.passForm = this.formBuilder.group({
      passcode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.passForm.valueChanges.subscribe((value) => {
      this.changeInput(value.passcode);
    });
  }

  changeInput(passcode) {
    if (passcode) {
      this.digitsLength = passcode.toString().length;
    }
    if (this.digitsLength > 5) {
      this.verifyPasscode();
    }
  }

  verifyPasscode() {
    this.regService.setUserObj({ pin: this.passForm.controls['passcode'].value })
    this.navCtrl.navigateRoot(
      `registration/confirm-passcode`
    );
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
      input.click();
    });
  }
}
