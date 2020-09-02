import {
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
  HostBinding,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ChangeCodeService } from '../services/change-code.service';
import { UpdatePassword } from '../models/UpdatePassword';

@Component({
  selector: 'app-cod-actual',
  templateUrl: './cod-actual.component.html',
  styleUrls: ['./cod-actual.component.scss'],
})
export class CodActualComponent
  implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Cod actual');
  digitsLength = 0;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription;
  phoneNumber = null;

  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  passForm: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private changeCodeS: ChangeCodeService,
  ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.passForm = this.formBuilder.group({
      digit: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(6),
        ],
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
      this.digitsLength = digit.toString().length;
    } else {
      this.digitsLength = 0;
    }
  }

  continue() {
    const { value } = this.passForm.controls.digit;
    const resetObj: UpdatePassword = {
      oldPassword: value,
      newPassword: '',
      userName: '',
    };
    this.changeCodeS.setUpdatePassObj(resetObj);
    this.proceed();
  }

  proceed() {
    this.router.navigate([
      'cod-acces/nou',
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
