import {
  AfterViewInit,
  Component,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { UpdatePassword } from '../models/UpdatePassword';
import { ChangeCodeService } from '../services/change-code.service';

@Component({
  selector: 'app-cod-acces-nou',
  templateUrl: './cod-acces-nou.component.html',
  styleUrls: ['./cod-acces-nou.component.scss'],
})
export class CodAccesNouComponent implements AfterViewInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Cod de acces nou');
  digitsLength = 0;
  sub: Subscription;
  lock = false;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  InvalidCode = false;
  constructor(
    private navCtrl: NavController,
    private changeCodeS: ChangeCodeService
  ) {}

  ngAfterViewInit() {
    this.lock = false;
  }

  continue(passForm: FormGroup) {
    if (!this.lock) {
      this.lock = true;
      const { value } = passForm.controls.passcode;
      if (value === '000000') {
        passForm.reset();
        this.InvalidCode = true;
      } else {
        const resetObj: UpdatePassword = {
          ...this.changeCodeS.getUpdatePassObj,
          newPassword: value,
        };
        this.changeCodeS.setUpdatePassObj(resetObj);
        this.proceed();
      }
    }
  }

  proceed() {
    this.lock = true;
    this.navCtrl.navigateForward(['cod-acces/confirmare']).then((v) => {
      this.lock = false;
    });
    this.lock = false;
  }

  clearErr(_) {
    this.lock = false;
    if (this.digitsLength > 0) {
      this.InvalidCode = null;
    }
  }

  digLength(length: number) {
    this.digitsLength = length;
  }

  ngOnDestroy() {
    unsubscriberHelper(this.sub);
  }
}
