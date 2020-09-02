import {
  Component,
  OnInit,
  ViewChild,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { Location } from '@angular/common';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ChangeCodeService } from '../services/change-code.service';
import { UpdatePassword } from '../models/UpdatePassword';

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
    private authS: AuthService,
    private changeCodeS: ChangeCodeService,
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
      if (this.digitsLength === 6) {
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
      this.authS.getAccountData().subscribe((account) => {
        if (account) {
          const resetObj: UpdatePassword = {
            ...this.changeCodeS.getUpdatePassObj,
            userName: account.userName, // Needs userName property to be set
          };
          this.changeCodeS.setUpdatePassObj(resetObj);
          this.changeAccessCode();
        }
      });
    } else {
      this.InvalidCode = true;
      setTimeout(() => {
        this.navCtrl.back();
      }, 3000);
    }
  }

  changeAccessCode() {
    this.changeCodeS.changeAccessCode().toPromise().then((res) => {
      if (res) {
        this.proceed();
      }
    }).finally(() => {
      this.busy = false;
    });
  }

  proceed() {
    this.router.navigate([
      'cod-acces/change-success',
    ]);
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
