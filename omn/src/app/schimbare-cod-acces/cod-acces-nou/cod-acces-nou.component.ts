import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { UpdatePassword } from '../models/UpdatePassword';
import { ChangeCodeService } from '../services/change-code.service';

@Component({
  selector: 'app-cod-acces-nou',
  templateUrl: './cod-acces-nou.component.html',
  styleUrls: ['./cod-acces-nou.component.scss'],
})
export class CodAccesNouComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Cod de acces nou');
  digitsLength = 0;
  sub: Subscription;
  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  InvalidCode = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private changeCodeS: ChangeCodeService
  ) {}

  ngOnInit() {}

  continue(passForm: FormGroup) {
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

  proceed() {
    this.router.navigate(['cod-acces/confirmare']);
  }

  clearErr(_) {
    if (this.digitsLength > 0) {
      this.InvalidCode = null;
    }
  }

  digLength(length: number) {
    this.digitsLength = length;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
