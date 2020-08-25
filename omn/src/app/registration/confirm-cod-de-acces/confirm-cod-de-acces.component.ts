import { Location } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-cod-de-acces',
  templateUrl: './confirm-cod-de-acces.component.html',
  styleUrls: ['./confirm-cod-de-acces.component.scss'],
})
export class ConfirmCodDeAccesComponent implements OnInit {
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  passForm: FormGroup;
  constructor(private navCtrl: NavController, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private location: Location) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.passcode) {
        this.initForm(params.passcode)
      } else {
        this.router.navigate(["registration/create-passcode"])
      }
    })

  }
  initForm(passcode) {
    this.passForm = this.formBuilder.group({
      passcode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      confirmPass: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]]
    });
    this.passForm.controls["passcode"].patchValue(passcode)

    this.passForm.valueChanges.subscribe((value) => {
      this.changeInput(value.confirmPass)
    })
  }

  changeInput(confirmPass) {
    if (confirmPass) {
      this.digitsLength = confirmPass.toString().length;
    }
    if (this.digitsLength > 5) {
      this.verifyPasscode()
    }
  }

  verifyPasscode() {
    console.log("i was here");
    
    if (this.passForm.controls["confirmPass"].value === parseInt(this.passForm.controls["passcode"].value)) {
      this.navCtrl.navigateRoot(`registration/personal-details`)
    } else {
      this.location.back()
    }

  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
      input.click()
    })
  }

}