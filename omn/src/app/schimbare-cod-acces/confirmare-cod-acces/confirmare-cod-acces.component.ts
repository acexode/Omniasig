import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { CustomStorageService } from 'src/app/core/services/custom-storage/custom-storage.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { UpdatePassword } from '../models/UpdatePassword';
import { ChangeCodeService } from '../services/change-code.service';

@Component({
  selector: 'app-confirmare-cod-acces',
  templateUrl: './confirmare-cod-acces.component.html',
  styleUrls: ['./confirmare-cod-acces.component.scss'],
})
export class ConfirmareCodAccesComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Confirmare cod de acces');
  digitsLength = 0;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription;
  accessCode = null;

  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  passForm: FormGroup;
  InvalidCode = false;
  busy = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
    private storeS: CustomStorageService,
    private changeCodeS: ChangeCodeService
  ) {
    this.accessCode = this.changeCodeS.getUpdatePassObj.newPassword;
  }

  ngOnInit() {
    this.initForm();
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
      if (this.digitsLength === 6 && !this.busy) {
        this.continue();
      }
    });
  }

  changeInput(digit: string) {
    if (digit) {
      this.digitsLength = digit.length;
    } else {
      this.digitsLength = 0;
    }
  }

  continue() {
    const { value } = this.passForm.controls.digit;
    if (value === this.accessCode) {
      this.busy = true;
      this.storeS.getItem<string>('phoneNumber').subscribe((phoneNumber) => {
        if (phoneNumber) {
          const resetObj: UpdatePassword = {
            ...this.changeCodeS.getUpdatePassObj,
            userName: phoneNumber,
          };
          this.changeCodeS.setUpdatePassObj(resetObj);
          this.changeAccessCode();
        }
      });
    } else {
      this.InvalidCode = true;
      this.navCtrl.navigateBack('/cod-acces/nou');
    }
  }

  changeAccessCode() {
    this.changeCodeS
      .changeAccessCode()
      .toPromise()
      .then((res) => {
        if (res) {
          this.proceed();
        }
      })
      .finally(() => {
        this.busy = false;
      });
  }

  proceed() {
    this.navCtrl.navigateForward(['/cod-acces/change-success']);
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
