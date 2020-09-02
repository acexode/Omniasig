import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput, NavController } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { ResetPincodeService } from './../services/reset-pincode.service';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.component.html',
  styleUrls: ['./confirm-pin.component.scss'],
})
export class ConfirmPinComponent implements OnInit, AfterViewInit {
  headerConfig = subPageHeaderDefault('Confirmare cod de acces');
  digitsLength = 0;
  @ViewChild('inputField') inputField: IonInput;
  pinForm: FormGroup;
  busy = false;
  invalidCode: string = null;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private resetPinService: ResetPincodeService
  ) {}

  ngOnInit() {
    this.checkObjFields();
  }

  ngAfterViewInit() {
    this.spawnInput();
  }

  checkObjFields() {
    if (
      !this.resetPinService.getResetObj?.cnp ||
      !this.resetPinService.getResetObj?.code ||
      !this.resetPinService.getResetObj?.newPin
    ) {
      this.navCtrl.navigateRoot('/reset-pincode');
    } else {
      this.initForm(this.resetPinService.getResetObj.newPin);
    }
  }

  initForm(pincode) {
    this.pinForm = this.formBuilder.group({
      pincode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      confirmPin: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
    this.pinForm.get('pincode').patchValue(pincode);

    this.pinForm.valueChanges.subscribe((value) => {
      this.changeInput(value.confirmPin);
    });
  }

  changeInput(confirmPin) {
    if (confirmPin) {
      this.digitsLength = confirmPin.toString().length;
    }
    if (this.digitsLength > 5) {
      this.verifyPin();
    }
  }

  verifyPin() {
    if (
      this.pinForm.get('confirmPin').value ===
      parseInt(this.pinForm.get('pincode').value, 10)
    ) {
      this.busy = true;
      this.resetPinService.confirmResetPincode().subscribe(
        (data) => {
          this.navCtrl.navigateRoot(`reset-pincode/reset-successful`);
          this.busy = false;
        },
        (err) => {
          this.invalidCode = err.error;
          this.navCtrl.navigateBack('/reset-pincode/verify-passcode');
        }
      );
    } else {
      this.navCtrl.navigateBack('/reset-pincode/new-pin');
    }
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
    });
  }
}
