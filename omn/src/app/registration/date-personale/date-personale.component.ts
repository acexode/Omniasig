import { genericErrorTexts } from './../../shared/data/generic-error-helper';
import { get } from 'lodash';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostBinding,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { RegistrationService } from 'src/app/core/services/auth/registration.service';
import { radiosConfigHelper } from 'src/app/shared/data/radios-config-helper';
import { subPageHeaderTertiary } from 'src/app/shared/data/sub-page-header-tertiary';
import { IonRadioInputOption } from 'src/app/shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/component/ion-radios-config';
import { cnpValidator } from 'src/app/shared/validators/cnp-validator';

@Component({
  selector: 'app-date-personale-reg',
  templateUrl: './date-personale.component.html',
  styleUrls: ['./date-personale.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePersonaleComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderTertiary({
    title: '',
    leadingIconClasses: 'icon-20 mt-2',
  });
  errorMsgs = [];
  showError = false;
  formSubmitting = false;
  detailsForm: FormGroup;
  config: any = {
    nume: {
      placeholder: 'Ionescu',
      type: 'text',
      inputMode: 'text',
      size: 100,
      inputLabel: {
        text: 'Nume',
        classes: 'w-100 pb-8',
      },
      clearable: true,
      inputClasses: '',
      autoCapitalize: 'sentences',
    },
    prenume: {
      placeholder: 'Ion',
      type: 'text',
      inputMode: 'text',
      size: 100,
      inputLabel: {
        text: 'Prenume',
        classes: 'w-100 pb-8',
      },
      clearable: true,
      inputClasses: '',
      autoCapitalize: 'sentences',
    },
    cnp: {
      placeholder: '1234567890123',
      type: 'number',
      inputMode: 'number',
      size: 100,
      inputLabel: {
        text: 'CNP',
        classes: 'w-100 pb-8',
      },
      clearable: true,
      inputClasses: '',
      minLength: 13,
      maxLength: 13,
    },
  };

  radiosConfig: IonRadiosConfig = radiosConfigHelper({
    label: '',
    mode: 'item',
  });
  radioOptions: Array<IonRadioInputOption> = [
    { label: 'Da', id: true },
    { label: 'Nu', id: false },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private regService: RegistrationService,
    private authS: AuthService,
    private cdRef: ChangeDetectorRef,
    private navCtrl: NavController
  ) {
    this.radiosConfig.itemClasses = 'w-40 pr-60 inline-flex';
    this.checkUserObj();
  }

  ngOnInit() {
    this.initForm();
  }

  checkUserObj() {
    if (
      !this.regService.getuserObj?.phoneNumber ||
      !this.regService.getuserObj?.userName ||
      !this.regService.getuserObj?.pin
    ) {
      // this.router.navigate(['/registration']);
    }
  }

  proceed() {
    const cnp = this.cnp.value;
    const phone = this.regService.getuserPhone();
    this.formSubmitting = true;
    this.authS.checkCNP(cnp, phone).subscribe(
      (e) => {
        this.regService.setUserObj({ ...this.detailsForm.value });
        this.router.navigate(['registration/email']);
      },
      (err) => {
        this.errorMsgs = genericErrorTexts(
          err
            ? get(err, 'error', 'A fost identificată o problemă...')
            : 'A fost identificată o problemă...',
          ''
        );
        this.showError = true;
        this.cdRef.detectChanges();
      },
      () => {
        this.formSubmitting = false;
      }
    );
  }
  get cnp() {
    return this.detailsForm.get('cnp');
  }
  goBack() {
    this.showError = false;
    this.errorMsgs = [];
    this.navCtrl.navigateBack('/registration');
  }
  initForm() {
    this.detailsForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      surname: ['', [Validators.required, Validators.minLength(2)]],
      cnp: this.formBuilder.control('', {
        validators: [
          Validators.required,
          Validators.minLength(13),
          Validators.pattern('[0-9]*'),
          Validators.maxLength(13),
          cnpValidator,
        ],
      }),
      isPublicPerson: ['', [Validators.required]],
      marketing: [false],
      roles: [['MobileUser']],
    });
    this.detailsForm.statusChanges.subscribe(() => {
      this.cdRef.markForCheck();
    });
  }
}
