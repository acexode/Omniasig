import {
  Component,
  OnInit,
  ViewChild,
  HostBinding,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { Location } from '@angular/common';

@Component({
  selector: 'app-confirmare-cod-acces',
  templateUrl: './confirmare-cod-acces.component.html',
  styleUrls: ['./confirmare-cod-acces.component.scss'],
})
export class ConfirmareCodAccesComponent implements OnInit {
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
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private navCtrl: NavController,
  ) {
    this.route.params.subscribe((params) => {
      if (params.code) {
        this.accessCode = params.code;
      } else {
        this.navCtrl.back();
      }
    });
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

  changeInput(digit: number) {
    if (digit) {
      this.digitsLength = digit.toString().length;
    } else {
      this.digitsLength = 0;
    }
  }

  continue() {
    if (this.passForm.controls.digit.value.toString() === this.accessCode) {
      this.proceed();
    } else {
      this.InvalidCode = true;
      setTimeout(() => {
        this.navCtrl.back();
      }, 2000);
    }
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
