import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import {
  InAppBrowser,
  InAppBrowserObject,
} from '@ionic-native/in-app-browser/ngx';
import { ModalController, NavController } from '@ionic/angular';
import { get, has } from 'lodash';
import { first, take } from 'rxjs/operators';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { PadService } from '../../services/pad.service';
import { PolicyDataService } from '../../services/policy-data.service';
import { CalendarEntry } from '../models/calendar-entry';
import { PaymentStatusComponent } from './../payment-status/payment-status.component';
import { Subscription } from 'rxjs';
import { isPlatform } from '@ionic/angular';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  policyType;
  offer: PolicyOffer = null;
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
  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private padS: PadService,
    private navCtrl: NavController,
    public modalController: ModalController,
    private iab: InAppBrowser
  ) {}

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: any) => {
      this.policyType = this.route.snapshot.queryParamMap.get('policyType');
      this.getPolicyById(params.id);
    });
  }

  getPolicyById(id) {
    this.policyDataService.getSingleOfferById(id, this.policyType).subscribe((offer) => {
      this.offer = offer;
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
      areTermsAccepted: true,
      currencyToPay: this.offer.policy.locuintaData.valueCurrency,
      policyCurrency: this.offer.policy.locuintaData.valueCurrency,
      policyCode: this.offer.offerCode,
      isMobilePayment: true,
    };
    this.sub = this.policyDataService.makePayment(data).subscribe(
      (dataV) => {
        this.busy = false;
        if (isPlatform('ios')) {
        this.openIAB(dataV.url, '_self');
      } else {
        this.openIAB(dataV.url, '_blank');
      }
      },
      (err) => (this.busy = false)
    );

    return;
  }

  openIAB(url, type) {
    const browser = this.iab.create(url, type, { usewkwebview: 'no', location: 'no' });
    browser.show();
    // TODO: linter complains, this is to be retested.
    if (browser) {
      this.sub = browser.on('loadstart').subscribe((e) => {
        if (e && e.url.includes('tok')) {
          this.confirmToken(e.url, browser);
        }
      });
      this.sub = browser.on('loaderror').subscribe((e) => {
        browser.close();
      });
      browser.on('exit').pipe(first()).subscribe(
        (e) => {
          this.sub.unsubscribe();
        });
    }
}

  confirmToken(urlPath, browser: InAppBrowserObject) {
    const url = new URL(urlPath).search;
    const urlParams = new URLSearchParams(url);
    const token = urlParams.get('tok');
    this.policyDataService.confirmPayment(token).subscribe(
      (data) => {
        browser.close();
        this.presentModal('success');
      },
      (err) => {
        browser.close();
        this.presentModal('failed', err.error);
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
}
