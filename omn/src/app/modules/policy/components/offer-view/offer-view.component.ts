import { Component, HostBinding, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import {
  InAppBrowser,
  InAppBrowserObject,
} from '@ionic-native/in-app-browser/ngx';
import { isPlatform, ModalController, NavController } from '@ionic/angular';
import { get, has, set } from 'lodash';
import { Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { locuinteFieldsData } from 'src/app/shared/data/locuinte-field-data';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { PolicyDataService } from '../../services/policy-data.service';
import { CalendarEntry } from '../models/calendar-entry';
import { SharedFileService } from './../../../../shared/modules/shared-file/services/shared-file.service';
import { PaymentStatusComponent } from './../payment-status/payment-status.component';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  policyType;
  offer: PolicyOffer = null;
  leiCurrency;
  headerConfig = subPageHeaderSecondary('Oferta de asigurare');
  viewMode: 'V' | 'C' = 'V';
  @HostBinding('class') color = 'ion-color-white-page';

  risksCovered = [
    'incendiu, trăsnet, explozie, căderi de corpuri aeriene',
    'cutremur, inundaţie și/sau alunecări / prăbușiri de teren',
    'furtună, uragan, grindină, ploaie torenţială, tornadă, greutatea stratului de zăpadă sau de gheaţă şi avalanşă de zăpadă',
    'prăbuşire de corpuri terestre',
    'coliziune cu (auto)vehicule şi boom sonic',
    'acţiunea animalelor',
    'greve, revolte, tulburări civile',
    'vandalism',
    'apă de conductă și refulare',
    'furt (doar pentru bunurile conținute)',
    'fenomene electrice in sublimita a 1.000 euro / eveniment / an de asigurare;',
    'avarii acidentale ale centralei termice in sublimita a 1.000 euro / eveniment / an de asigurare.',
  ];

  insuranceOffer = [
    {
      header: null,
      description: `600 EUR sau echivalent RON pentru închirierea unui spaţiu de locuit, situație generată de lipsa de folosinţă a locuinţei asigurate din cauza producerii unui eveniment asigurat (perioada maximă de despăgubire 6 luni);`,
    },
    {
      header: 'Cheltuieli cu prevenirea daunelor – ',
      description:
        'sublimita 10% din suma asigurată a bunurilor amenintate de evenimentul respectiv;',
    },
    {
      header: 'Cheltuieli pentru stingerea oricarui incendiu – ',
      description:
        'sublimita 10% din suma asigurată a bunurilor afectate de incendiu;',
    },
    {
      header: 'Cheltuieli pentru limitarea daunelor – ',
      description:
        'sublimită de 10% din suma asigurată a bunurilor afectate de evenimentul asigurat respectiv;',
    },
    {
      header:
        'Cheltuieli pentru efectuarea lucrarilor de curațare in urma unui eveniment asigurat – ',
      description: 'sublimita 10% din suma asigurată a bunurilor afectate;',
    },
    {
      header: 'Cheltuieli cu expertizarea daunelor – ',
      description:
        'sublimita 10% din suma asigurată a bunurilor afectate, max 1.000 EUR/ eveniment;',
    },
    {
      header:
        'În cazul asigurării riscului de furt, costuri / cheltuieli ocazionate de: ',
      description:
        'daune produse prin spargerea sau deteriorarea cu prilejul furtului sau tentativei de furt prin efracţie, curăţarea sau înlocuirea încuietorilor avariate pentru o sublimită a 10% din suma asigurată a bunurilor conţinute asigurate max 1.000 EUR / eveniment;',
    },
    {
      header: 'În cazul asigurării răspunderii civile, cheltuielile ',
      description:
        'efectuate de către Asigurat în procesul civil, dacă a fost obligat la plata unor despăgubiri, decurgând din evenimente asigurate produse în perioada de asigurare.',
    },
  ];

  calEntry: CalendarEntry;
  busy = false;
  sub: Subscription;
  disableNotificationSection = true;
  downloading = false;
  formG: FormGroup = this.fb.group({
    accept: this.fb.control(false, Validators.requiredTrue),
  });
  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private navCtrl: NavController,
    public modalController: ModalController,
    private iab: InAppBrowser,
    private fileS: SharedFileService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: any) => {
      this.policyType = this.route.snapshot.queryParamMap.get('policyType');
      this.getPolicyById(params.id);
    });
  }

  getPolicyById(id) {
    this.policyType =
      this.policyType === 'Garant AMPLUS + PAD'
        ? 'AMPLUS_PAD'
        : this.policyType;
    this.policyDataService
      .getSingleOfferById(id, this.policyType)
      .subscribe((offer) => {
        this.offer = offer;
        this.leiCurrency =
          this.policyType === 'PAD'
            ? true
            : locuinteFieldsData.valueCurrency[1].id ===
              this.offer?.policy?.locuintaData?.valueCurrency
            ? true
            : false;
        if (offer && has(offer, 'policy.typeId')) {
          this.policyType = get(offer, 'policy.typeId', this.policyType);
        }
        this.setCalEntry(this.offer);
      });
  }

  closeOffer() {
    this.navCtrl.navigateRoot('/policy');
  }

  backToOffer() {
    this.viewMode = 'V';
    this.headerConfig = subPageHeaderSecondary('Oferta de asigurare');
  }

  gotoConditions() {
    this.viewMode = 'C';
    this.headerConfig = subPageHeaderDefault('Condiţii de asigurare');
    this.headerConfig.leadingIcon.routerLink = false;
  }

  setCalEntry(offer: PolicyOffer) {
    const date = get(offer, 'expiry', null);
    let processedDate;
    try {
      processedDate = Date.parse(date);
      this.calEntry = {
        title: 'Expirare oferta ' + get(offer, 'policy.name', ''),
        location: 'Romania',
        notes:
          'Oferta ' + offer.id + ' expira la ' + dateHelperDMY(processedDate),
        startDate: this.policyDataService.getEightDayBeforeExpiryDate(
          processedDate
        ),
        endDate: new Date(processedDate),
        options: {
          firstReminderMinutes: 15,
          calendarName: 'offer',
        },
      };
    } catch (e) {}
  }

  addCalendarEntry() {
    this.policyDataService.addExpiryCalendarEntry(this.calEntry);
  }

  pay() {
    // Starting the payment workflow here
    this.busy = true;
    const data = {
      ibaN_1: this.offer.iban,
      amount_IBAN_1: this.offer.firstPaymentValue,
      areTermsAccepted: this.formG.get('accept').value,
      currencyToPay:
        this.policyType === 'PAD' || this.policyType === 'AMPLUS_PAD'
          ? 'RON'
          : this.offer.policy.locuintaData.valueCurrency,
      policyCurrency:
        this.policyType === 'PAD' || this.policyType === 'AMPLUS_PAD'
          ? 'RON'
          : this.offer.policy.locuintaData.valueCurrency,
      policyCode: this.offer.offerCode,
      isMobilePayment: true,
    };
    if (this.policyType === 'AMPLUS_PAD') {
      const offer = this.offer;
      set(data, 'ibaN_2', get(offer.padInsurance, 'iban', null));
      set(
        data,
        'amount_IBAN_2',
        get(offer.padInsurance, 'firstPaymentValue', null)
      );
    }
    this.sub = this.policyDataService.makePayment(data).subscribe(
      (dataV) => {
        if (isPlatform('ios')) {
          this.openIAB(dataV.url, '_blank');
        } else {
          this.openIAB(dataV.url, '_blank');
        }
        this.busy = false;
      },
      (err) => (this.busy = false)
    );
    return;
  }

  openIAB(url, type) {
    const options =
      'location=no,footer=yes,hardwareback=no,hidenavigationbuttons=yes,clearcache=yes,clearsessioncache=yes,toolbar=yes,closebuttoncaption=Close';
    const browser = this.iab.create(url, type, options);
    browser.show();
    // TODO: linter complains, this is to be retested.
    if (browser) {
      this.sub = browser.on('loadstart').subscribe((e) => {
        browser.insertCSS({ code: '.header__cancel{ display: none;}' });
        if (e && e.url.includes('tok')) {
          this.confirmToken(e.url, browser);
        }
      });
      this.sub = browser.on('loadstop').subscribe((e) => {
        browser.insertCSS({ code: '.header__cancel{ display: none;}' });
      });
      this.sub = browser.on('loaderror').subscribe((e) => {
        browser.close();
      });
      browser
        .on('exit')
        .pipe(first())
        .subscribe((e) => {
          this.sub.unsubscribe();
        });
    }
  }

  confirmToken(urlPath, browser: InAppBrowserObject) {
    const url = new URL(urlPath).search;
    const urlParams = new URLSearchParams(url);
    const token = urlParams.get('tok');
    this.policyDataService.confirmPayment(token, this.policyType).subscribe(
      (data) => {
        browser.close();
        if (
          (this.policyType === 'PAD' &&
            get(data, 'emiterePadPolitaResponse', null)) ||
          (this.policyType === 'AMPLUS' &&
            get(data, 'emitereAmplusPolitaResponse', null))
        ) {
          this.presentModal('success');
          this.policyDataService.initData();
        } else {
          this.presentModal('failed', 'Plata a esuat!');
        }
      },
      (err) => {
        browser.close();
        this.presentModal(
          'failed',
          err.error ? err.error : err.message ? err.message : ''
        );
      }
    );
  }

  async presentModal(
    paymentStatus: 'failed' | 'success',
    failureReason?: string
  ) {
    const modal = await this.modalController.create({
      component: PaymentStatusComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        paymentStatus,
        failureReason,
      },
    });
    return await modal.present();
  }

  downloadAmplusOffer() {
    const title = `amplus-offer-${get(
      this.offer,
      'amplusOfferDocumentId',
      0
    )}.pdf`;
    let id = null;
    try {
      id = parseInt(get(this.offer, 'amplusOfferDocumentId', 0), 10);
    } catch (e) {
      id = null;
    }

    if (!id) {
      return this.presentDocModal(
        'Documentul nu este disponibil',
        'Documentul este in curs de pregatire. Reincercati mai tarziu.'
      );
    } else {
      this.downloading = true;
      this.fileS
        .downloadAndOpenFile({
          fileName: title,
          storeKey: title,
          downloadService: this.policyDataService.getPolicyOfferDocumentById(
            id
          ),
          fileFormat: 'application/pdf',
        })
        .subscribe(
          (v) => {
            this.downloading = false;
          },
          (err) => {
            Promise.resolve(
              this.presentDocModal(
                'Nu am putut descarca fisierul',
                err ? get(err, 'error', '') : ''
              )
            );
            this.downloading = false;
          }
        );
    }
  }

  downloadPadOffer() {
    const offer =
      this.policyType === 'AMPLUS_PAD'
        ? get(this.offer, 'padInsurance', {})
        : this.offer;
    const title = `offer-${get(offer, 'padOfferDocumentId', 0)}.pdf`;
    let id = null;
    try {
      id = parseInt(get(offer, 'padOfferDocumentId', 0), 10);
    } catch (e) {
      id = null;
    }

    if (!id) {
      return this.presentDocModal(
        'Documentul nu este disponibil',
        'Documentul este in curs de pregatire. Reincercati mai tarziu.'
      );
    } else {
      this.downloading = true;
      this.fileS
        .downloadAndOpenFile({
          fileName: title,
          storeKey: title,
          downloadService: this.policyDataService.getPolicyOfferDocumentById(
            id
          ),
          fileFormat: 'application/pdf',
        })
        .subscribe(
          (v) => {
            this.downloading = false;
          },
          (err) => {
            Promise.resolve(
              this.presentDocModal(
                'Nu am putut descarca fisierul',
                err ? get(err, 'error', '') : ''
              )
            );
            this.downloading = false;
          }
        );
    }
  }

  async presentDocModal(title, description) {
    const modal = await this.fileS.createErrorModal(title, description);
    return await modal.present();
  }
}
