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
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngAfterViewInit(): void {
    this.spawnInput();
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      if (params.passcode) {
        this.initForm(params.passcode);
      } else {
        this.router.navigate(['registration/create-passcode']);
      }
    });
  }
  initForm(passcode) {
    this.passForm = this.formBuilder.group({
      passcode: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
      confirmPass: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.passForm.get('passcode').patchValue(passcode);

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
      parseInt(this.passForm.get('passcode').value, 10)
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
