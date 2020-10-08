import { AuthService } from 'src/app/core/services/auth/auth.service';
import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
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
export class ConfirmareCodAccesComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Confirmare cod de acces');
  digitsLength = 0;
  sub: Subscription;
  accessCode = null;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  InvalidCode = false;
  busy = false;

  constructor(
    private navCtrl: NavController,
    private authS: AuthService,
    private changeCodeS: ChangeCodeService
  ) {
    if (this.changeCodeS.getUpdatePassObj?.newPassword) {
      this.accessCode = this.changeCodeS.getUpdatePassObj.newPassword;
    } else {
      this.navCtrl.navigateBack('/cod-acces');
    }
  }

  ngAfterViewInit() {
    this.busy = false;
  }

  continue(passForm: FormGroup) {
    if (!this.busy) {
      const { value } = passForm.controls.passcode;
      if (value === this.accessCode) {
        this.busy = true;
        this.authS.getPhoneNumber().subscribe((phoneNumber: any) => {
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
        console.log(value);
        console.log(this.accessCode);
        this.InvalidCode = true;
        this.navCtrl.navigateBack('/cod-acces/nou');
      }
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
    this.navCtrl.navigateRoot(['/cod-acces/change-success']);
    this.busy = false;
  }

  ngOnDestroy() {
    unsubscriberHelper(this.sub);
  }
}
