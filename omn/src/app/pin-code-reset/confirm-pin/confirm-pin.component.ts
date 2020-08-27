import { Location } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-confirm-pin',
  templateUrl: './confirm-pin.component.html',
  styleUrls: ['./confirm-pin.component.scss'],
})
export class ConfirmPinComponent implements OnInit, AfterViewInit {
  headerConfig = subPageHeaderDefault('Confirmare cod de acces');
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  pinForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.pin) {
        this.initForm(params.pin);
      } else {
        this.location.back();
      }
    });
  }

  ngAfterViewInit() {
    this.spawnInput();
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
    this.pinForm.controls['pincode'].patchValue(pincode);

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
      this.pinForm.controls['confirmPin'].value ===
      parseInt(this.pinForm.controls['pincode'].value, 10)
    ) {
      this.navCtrl.navigateRoot(`reset-pincode/reset-successful`);
    } else {
      this.location.back();
    }
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
      // input.click()
    });
  }
}
