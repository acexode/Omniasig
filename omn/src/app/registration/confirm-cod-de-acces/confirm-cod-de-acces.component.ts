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

  ngOnInit() {
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

  verifyPasscode(passForm:FormGroup) {
    if (
      passForm.get('passcode').value ==
      this.regService.getuserObj.pin
    ) {
      this.navCtrl.navigateRoot(`registration/personal-details`);
    } else {
      this.navCtrl.navigateBack(['/registration', 'create-passcode']);
    }
  }

}
