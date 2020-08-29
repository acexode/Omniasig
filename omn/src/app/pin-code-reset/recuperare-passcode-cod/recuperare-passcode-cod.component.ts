import { ResetPincodeService } from './../services/reset-pincode.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomTimersService } from 'src/app/core/services/custom-timers/custom-timers.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';

@Component({
  selector: 'app-recuperare-passcode-cod',
  templateUrl: './recuperare-passcode-cod.component.html',
  styleUrls: ['./recuperare-passcode-cod.component.scss'],
})
export class RecuperarePasscodeCodComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Verificare Email')
  min: string = '00';
  sec: any = 59;
  digitsLength: number = 0;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription;
  phoneNumber = null;

  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  passForm: FormGroup;
  InvalidCode: boolean = false
  constructor(
    private resetPinService: ResetPincodeService,
    private router: Router,
    private timers: CustomTimersService,
    private formBuilder: FormBuilder
  ) {
    this.checkCNP()
  }

  ngOnInit() {
    this.initForm();
  }

  checkCNP() {
    if (!this.resetPinService.getResetObj?.cnp) {
      this.router.navigate(['/reset-pincode'])
    }
  }

  initForm() {
    this.passForm = this.formBuilder.group({
      digit: [
        '',
        [Validators.required, Validators.minLength(6), Validators.maxLength(6)],
      ],
    });

    this.sub = this.passForm.valueChanges.subscribe((value) => {
      this.changeInput(value.digit);
    });
  }

  changeInput(digit: number) {
    if (digit) {
      this.digitsLength = digit.toString().length;
    } else {
      this.digitsLength = 0
    }
  }

  continue() {
    this.resetPinService.setResetObj({ code: this.passForm.controls["digit"].value })
    this.router.navigate(['reset-pincode/new-pin']);
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
    this.resetPinService.requestPincodeChange(this.resetPinService.resetObj.cnp).subscribe(
      (data)=>{
        this.startTimer();
      },
      (err)=>err
    )
  }

  spawnInput() {
    this.inputField.getInputElement().then((input) => {
      input.focus();
      input.click();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
