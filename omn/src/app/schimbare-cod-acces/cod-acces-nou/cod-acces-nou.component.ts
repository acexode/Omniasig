import {
  Component,
  OnInit,
  ViewChild,
  HostBinding,
  OnDestroy,
} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonInput } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';

@Component({
  selector: 'app-cod-acces-nou',
  templateUrl: './cod-acces-nou.component.html',
  styleUrls: ['./cod-acces-nou.component.scss'],
})
export class CodAccesNouComponent implements OnInit, OnDestroy {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Cod de acces nou');
  digitsLength = 0;
  @ViewChild('inputField') inputField: IonInput;
  sub: Subscription;

  config: IonInputConfig = {
    type: 'number',
    inputMode: 'number',
  };
  passForm: FormGroup;
  InvalidCode = false;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
  ) { }

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
        this.proceed();
        this.passForm.reset();
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

  proceed() {
    this.router.navigate([
      'cod-acces/confirmare',
      this.passForm.get('digit').value,
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
