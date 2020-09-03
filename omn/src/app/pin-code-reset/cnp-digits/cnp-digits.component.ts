import { ResetPincodeService } from './../services/reset-pincode.service';
import { Component, OnInit, HostBinding } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { IonInputConfig } from 'src/app/shared/models/component/ion-input-config';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-cnp-digits',
  templateUrl: './cnp-digits.component.html',
  styleUrls: ['./cnp-digits.component.scss'],
})
export class CnpDigitsComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Introduceti CNP-ul');
  label: IonTextItem = {
    text: 'CNP',
    classes: 'w-100',
    slot: 'end',
  };
  config: IonInputConfig = {
    placeholder: '1234567890123',
    type: 'number',
    inputMode: 'number',
    size: 13,
    inputLabel: this.label,
    minLength: 13,
    maxLength: 13,
    clearable: true,
  };
  cnpForm: FormGroup;
  busy = false;
  invalidCode: string = null;
  constructor(private router: Router, private formBuilder: FormBuilder, private resetService: ResetPincodeService) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.cnpForm = this.formBuilder.group({
      cnp: [
        '',
        [
          Validators.required,
          Validators.minLength(13),
          Validators.maxLength(13),
        ],
      ],
    });

    this.cnpForm.valueChanges.subscribe(
      (data) => {
        if (this.invalidCode) {
          this.invalidCode = null;
        }
      }
    );
  }

  continue() {
    this.busy = true;
    this.resetService.requestPincodeChange(this.cnpForm.controls['cnp'].value).subscribe(
      (data) => {
        this.resetService.setResetObj({ cnp: this.cnpForm.controls['cnp'].value });
        this.router.navigate(['reset-pincode/verify-passcode']);
        this.busy = false;
      },
      (err) => {
        this.invalidCode = err.error;
        this.busy = false;
      },
    );
  }
}
