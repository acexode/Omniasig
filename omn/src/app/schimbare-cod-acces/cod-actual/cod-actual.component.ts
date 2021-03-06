import { NavController } from '@ionic/angular';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodActualComponent implements AfterViewInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Cod actual');
  digitsLength = 0;
  InvalidCode = false;
  phoneNumber = null;
  lock = false;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  constructor(
    private navCtrl: NavController,
    private authS: AuthService,
    private changeCodeS: ChangeCodeService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngAfterViewInit() {
    this.lock = false;
  }

  continue(passForm: FormGroup) {
    const value = passForm.get('passcode').value;
    if (!this.lock) {
      this.lock = true;
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
          () => {
            this.InvalidCode = false;
            const resetObj: UpdatePassword = {
              oldPassword: value,
              newPassword: '',
              userName: '',
            };
            this.changeCodeS.setUpdatePassObj(resetObj);
            this.proceed();
          },
          () => {
            passForm.reset();
            this.InvalidCode = true;
            this.cdRef.markForCheck();
          }
        );
    }
  }

  proceed() {
    this.navCtrl.navigateForward(['cod-acces/nou']).then((v) => {
      this.lock = false;
    });
    this.lock = false;
  }

  clearErr(_) {
    this.lock = false;
    if (this.InvalidCode) {
      this.InvalidCode = null;
      this.cdRef.markForCheck();
    }
  }
}
