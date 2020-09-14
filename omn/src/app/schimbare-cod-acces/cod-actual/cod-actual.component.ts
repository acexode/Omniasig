import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription, throwError } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { UpdatePassword } from '../models/UpdatePassword';
import { ChangeCodeService } from '../services/change-code.service';

@Component({
  selector: 'app-cod-actual',
  templateUrl: './cod-actual.component.html',
  styleUrls: ['./cod-actual.component.scss'],
})
export class CodActualComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Cod actual');
  digitsLength = 0;
  InvalidCode = false;
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
    private authS: AuthService,
    private changeCodeS: ChangeCodeService
  ) {}

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
    this.InvalidCode = false;
    if (digit) {
      this.digitsLength = digit.toString().length;
    } else {
      this.digitsLength = 0;
    }
  }

  continue() {
    const value = this.passForm.get('digit').value;
    this.authS
      .lastLoginNumber()
      .pipe(
        take(1),
        switchMap((pN) => {
          if (pN) {
            return this.authS.login({
              phone: pN.toString(),
              password: value,
              aRoute: null,
            });
          } else {
            return throwError('NO_PHONE');
          }
        })
      )
      .subscribe(
        (v) => {
          this.InvalidCode = false;

          const resetObj: UpdatePassword = {
            oldPassword: value,
            newPassword: '',
            userName: '',
          };
          this.changeCodeS.setUpdatePassObj(resetObj);
          this.proceed();
        },
        (err) => {
          this.passForm.reset();
          this.InvalidCode = true;
        }
      );
  }

  proceed() {
    this.router.navigate(['cod-acces/nou']);
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
