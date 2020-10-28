import { AuthService } from 'src/app/core/services/auth/auth.service';
import { cnpValidator } from 'src/app/shared/validators/cnp-validator';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationService } from 'src/app/core/services/auth/registration.service';
import { radiosConfigHelper } from 'src/app/shared/data/radios-config-helper';
import { subPageHeaderTertiary } from 'src/app/shared/data/sub-page-header-tertiary';
import { IonRadioInputOption } from 'src/app/shared/models/component/ion-radio-input-option';
import { IonRadiosConfig } from 'src/app/shared/models/component/ion-radios-config';
import { NavController } from '@ionic/angular';

@Component( {
  selector: 'app-date-personale',
  templateUrl: './date-personale.component.html',
  styleUrls: [ './date-personale.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush
} )
export class DatePersonaleComponent implements OnInit {
  @HostBinding( 'class' ) color = 'ion-color-white-page';
  headerConfig = subPageHeaderTertiary( {
    title: '',
    leadingIconClasses: 'icon-20 mt-2',
  } );
  errMsg;
  errTitle;
  showError = false;
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

  radiosConfig: IonRadiosConfig = radiosConfigHelper( {
    label: '',
    mode: 'item',
  } );
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
    this.authS.checkCNP(cnp, phone).subscribe(e => {
      this.regService.setUserObj( { ...this.detailsForm.value } );
      this.router.navigate( [ 'registration/email' ] );
    }, (err) => {
      this.errTitle = {
        text: 'Ne pare rău...',
        class: 'color-red',
      };
      this.errMsg = [
        {
          classes: 'ion-text-center',
          text: err.error
        },
        {
          classes: 'ion-text-center mt-12',
          text: 'Te rugăm să iei legătura cu un reprezentant OMNIASIG.'
        }
      ];
      this.showError = true;
      this.cdRef.detectChanges();
      setTimeout(() => {
        this.showError = false;
        this.navCtrl.navigateBack('/registration');
      }, 2000);
    });
  }
  
  get cnp() {
    return this.detailsForm.get('cnp');
  }
  initForm() {
    this.detailsForm = this.formBuilder.group( {
      name: [ '', [ Validators.required, Validators.minLength( 2 ) ] ],
      surname: [ '', [ Validators.required, Validators.minLength( 2 ) ] ],
      cnp: [
        '',
        [
          Validators.required,
          Validators.minLength( 13 ),
          Validators.maxLength( 13 ),
          cnpValidator
        ],
      ],
      isPublicPerson: [ '', [ Validators.required ] ],
      marketing: [ false ],
      roles: [ [ 'MobileUser' ] ],
    } );
  }
}
