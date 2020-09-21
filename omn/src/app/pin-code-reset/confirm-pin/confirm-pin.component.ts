import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { ResetPincodeService } from './../services/reset-pincode.service';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.component.html',
  styleUrls: ['./confirm-pin.component.scss'],
})
export class ConfirmPinComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Confirmare cod de acces');
  @ViewChild('inputField') inputField: IonInput;
  busy = false;
  errorLogin: string = null;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private resetPinService: ResetPincodeService
  ) {}

  ngOnInit() {
    this.checkObjFields();
  }

  checkObjFields() {
    if (
      !this.resetPinService.getResetObj?.cnp ||
      !this.resetPinService.getResetObj?.code ||
      !this.resetPinService.getResetObj?.newPin
    ) {
      this.navCtrl.navigateRoot('/reset-pincode');
    }
  }

  verifyPin(pinForm: FormGroup) {
    if (
      pinForm.get('passcode').value === this.resetPinService.getResetObj.newPin
    ) {
      this.busy = true;
      this.resetPinService.confirmResetPincode().subscribe(
        (data) => {
          this.navCtrl.navigateRoot(`reset-pincode/reset-successful`);
          this.busy = false;
        },
        (err) => {
          this.errorLogin = err.error;
          this.navCtrl.navigateBack('/reset-pincode/verify-passcode');
        }
      );
    } else {
      this.navCtrl.navigateBack('/reset-pincode/new-pin');
    }
  }

  clearErr(_) {
    this.errorLogin = null;
  }
}
