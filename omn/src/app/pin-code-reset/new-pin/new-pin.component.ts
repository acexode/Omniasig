import { ResetPincodeService } from './../services/reset-pincode.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-new-pin',
  templateUrl: './new-pin.component.html',
  styleUrls: ['./new-pin.component.scss'],
})
export class NewPinComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Cod de acces nou');
  @ViewChild('inputField') inputField: IonInput;
  errorLogin = null;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private resetPinService: ResetPincodeService
  ) {
    this.checkObjFields();
  }

  checkObjFields() {
    if (
      !this.resetPinService.getResetObj?.cnp ||
      !this.resetPinService.getResetObj?.code
    ) {
      this.navCtrl.navigateRoot('/reset-pincode');
    }
  }

  ngOnInit() {}

  verifyPincode(pinForm: FormGroup) {
    this.resetPinService.setResetObj({
      newPin: pinForm.get('passcode').value,
    });
    this.navCtrl.navigateRoot(`/reset-pincode/confirm-pin`);
  }

  clearErr(_: any) {
    this.errorLogin = null;
  }
}
