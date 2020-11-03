import { Location } from '@angular/common';
import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { schimbareNumarSubpageHeader } from 'src/app/schimbare-numar-telefon/data/schimbare-numar-subpage-header';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { ConfirmNewPhoneNumber } from '../models/ConfirmNewPhoneNumber.interface';
import { PhonenumberService } from '../services/phonenumber.service';

@Component({
  selector: 'app-verify-phone-number',
  templateUrl: './verify-phone-number.component.html',
  styleUrls: ['./verify-phone-number.component.scss'],
})
export class VerifyPhoneNumberComponent implements OnInit, AfterViewInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig;
  min = '00';
  sec: any = 59;
  digitsLength = 0;
  phoneNumber = null;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  InvalidCode = false;
  passForm: FormGroup;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timers: CustomTimersService,
    private formBuilder: FormBuilder,
    private location: Location,
    private phS: PhonenumberService,
    private authS: AuthService,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((params) => {
      if (params.phone) {
        this.phoneNumber = params.phone;
      } else {
        this.location.back();
      }
    });
  }

  ngOnInit() {
    this.headerConfig = schimbareNumarSubpageHeader({
      title: 'Cod de verificare',
      hasTrailingIcon: true,
      hasLeadingIcon: true,
      backLink: false,
    });
  }

  ngAfterViewInit() {
    this.startTimer();
  }

  startTimer() {
    this.timers.buildTimer(59).subscribe((time: number) => {
      this.sec = time;
    });
  }

  resendSMS() {
    this.startTimer();
  }

  proceed() {
    this.router.navigate(['phone-number/change-successful']);
  }

  exitFlow() {
    this.navCtrl.navigateBack(['/home']);
  }

  back() {
    this.navCtrl.navigateBack(['/phone-number/enter-number']);
  }

  continue() {
    this.authS.getAuthState().subscribe((authData) => {
      const { userId } = authData.account;
      const requestNewPhoneDetails: ConfirmNewPhoneNumber = {
        confirmationCode: this.passForm.controls.passcode.value,
        userNameOrId: userId,
        newPhoneNumber: this.phoneNumber,
      };
      this.phS.validatePhoneCode(requestNewPhoneDetails).subscribe(
        (response) => {
          this.proceed();
        },
        (err) => {
          this.passForm.reset();
          this.InvalidCode = true;
        }
      );
    });
  }

  verifyPin(passForm: FormGroup) {
    this.passForm = passForm;
  }

  digLength(length: number) {
    this.digitsLength = length;
  }

  clearErr(_) {
    this.InvalidCode = null;
  }
}
