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
  headerConfig = subPageHeaderDefault('Cod de acces nou')
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  pinForm: FormGroup;
  constructor(private navCtrl: NavController, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initForm()
  }
  initForm() {
    this.pinForm = this.formBuilder.group({
      pincode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
    });

    this.pinForm.valueChanges.subscribe((value) => {
      this.changeInput(value.pincode)
    })
  }

  changeInput(pincode) {
    if (pincode) {
      this.digitsLength = pincode.toString().length
    }
    if (this.digitsLength > 5) {
      this.verifyPincode()
    }
  }

  verifyPincode() {
    this.navCtrl.navigateRoot(`/reset-pincode/confirm-pin/${this.pinForm.controls["pincode"].value}`)
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
      input.click()
    })
  }

}