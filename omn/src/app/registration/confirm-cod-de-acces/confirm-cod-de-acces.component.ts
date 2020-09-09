import { RegistrationService } from './../../core/services/auth/registration.service';
import {
  AfterViewInit,
  Component,
  HostBinding,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';

@Component({
  selector: 'app-confirm-cod-de-acces',
  templateUrl: './confirm-cod-de-acces.component.html',
  styleUrls: ['./confirm-cod-de-acces.component.scss'],
})
export class ConfirmCodDeAccesComponent implements OnInit, AfterViewInit {
  digitsLength = 0;
  @HostBinding('class') color = 'ion-color-white-page';
  @ViewChild('inputField', { static: true }) inputField: IonInput;
  passForm: FormGroup;
  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private router: Router,
    private regService: RegistrationService
  ) {
    this.checkUserObj();
  }
  ngAfterViewInit(): void {
    this.spawnInput();
  }

  ngOnInit() {
    this.initForm();
  }

  checkUserObj() {
    if (
      !this.regService.getuserObj?.phoneNumber ||
      !this.regService.getuserObj?.userName ||
      !this.regService.getuserObj?.pin
    ) {
      this.router.navigate(['/registration']);
    }
  }

  initForm() {
    this.passForm = this.formBuilder.group({
      confirmPass: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });
    this.passForm.valueChanges.subscribe((value) => {
      this.changeInput(value.confirmPass);
    });
  }

  changeInput(confirmPass) {
    if (confirmPass) {
      this.digitsLength = confirmPass.toString().length;
    }
    if (this.digitsLength > 5) {
      this.verifyPasscode();
    }
  }

  verifyPasscode() {
    if (
      this.passForm.get('confirmPass').value ===
      this.regService.getuserObj.pin
    ) {
      this.navCtrl.navigateRoot(`registration/personal-details`);
    } else {
      this.navCtrl.navigateBack(['/registration', 'create-passcode']);
    }
  }

  spawnInput() {
    if (this.inputField) {
      this.inputField.setFocus();
    }
  }
}
