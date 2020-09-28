import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { ResetPincodeService } from './../services/reset-pincode.service';

@Component({
  selector: 'app-recuperare-passcode-cod',
  templateUrl: './recuperare-passcode-cod.component.html',
  styleUrls: ['./recuperare-passcode-cod.component.scss'],
})
export class RecuperarePasscodeCodComponent
  implements OnInit, AfterViewInit, OnDestroy {
  headerConfig = subPageHeaderDefault('Verificare Email');
  min = '00';
  sec: any = 59;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription;
  phoneNumber = null;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  InvalidCode = false;
  digitLength = 0;
  passForm: FormGroup;
  constructor(
    private resetPinService: ResetPincodeService,
    private router: Router,
    private timers: CustomTimersService,
    private formBuilder: FormBuilder
  ) {
    this.checkCNP();
  }

  ngOnInit() {}

  checkCNP() {
    if (!this.resetPinService.getResetObj?.cnp) {
      this.router.navigate(['/reset-pincode']);
    }
  }

  continue() {
    if (this.passForm) {
      this.resetPinService.setResetObj({
        code: this.passForm.get('passcode').value,
      });
      this.router.navigate(['reset-pincode/new-pin']);
    }
  }

  ngAfterViewInit() {
    this.startTimer();
  }

  startTimer() {
    this.sub = this.timers.buildTimer(59).subscribe((time: number) => {
      this.sec = time;
    });
  }

  resendSMS() {
    this.resetPinService
      .requestPincodeChange(this.resetPinService.resetObj.cnp)
      .subscribe(
        (data) => {
          this.startTimer();
        },
        (err) => err
      );
  }

  setupForm(formGroup) {
    this.passForm = formGroup;
  }

  clearErr(_) {
    this.InvalidCode = false;
  }

  setDigitLength(length: number) {
    this.digitLength = length;
  }

  ngOnDestroy() {
    unsubscriberHelper(this.sub);
  }
}
