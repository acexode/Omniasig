import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  InAppBrowser,
  InAppBrowserObject,
} from '@ionic-native/in-app-browser/ngx';
import { isPlatform, ModalController, NavController } from '@ionic/angular';
import { get, has } from 'lodash';
import { Subscription } from 'rxjs';
import { first, take } from 'rxjs/operators';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { locuinteFieldsData } from 'src/app/shared/data/locuinte-field-data';
import { PolicyDataService } from '../../services/policy-data.service';
import { AmplusService } from '../../services/amplus.service';
import { PadService } from '../../services/pad.service';
import { CalendarEntry } from '../models/calendar-entry';
import { PaymentStatusComponent } from './../payment-status/payment-status.component';
import { CustomStorageService } from 'src/app/core/services/custom-storage/custom-storage.service';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { DownloadErrorModalComponent } from '../modals/download-error-modal/download-error-modal.component';

@Component( {
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: [ './offer-view.component.scss' ],
} )
export class OfferViewComponent implements OnInit {
  policyType;
  offer: PolicyOffer = null;
  leiCurrency;
  headerConfig = subPageHeaderSecondary('Oferta de asigurare');
  viewMode: 'V' | 'C' = 'V';
  @HostBinding( 'class' ) color = 'ion-color-white-page';

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
  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private navCtrl: NavController,
    public modalController: ModalController,
    private iab: InAppBrowser,
    private amplusService: AmplusService,
    private padService: PadService,
    private file: File,
    private storeS: CustomStorageService,
    private fileOpener: FileOpener,
  ) {}

  ngOnInit(): void {
    this.route.params.pipe( take( 1 ) ).subscribe( ( params: any ) => {
      this.policyType = this.route.snapshot.queryParamMap.get( 'policyType' );
      this.getPolicyById( params.id );
    } );
  }

  getPolicyById( id ) {
    this.policyDataService
      .getSingleOfferById( id, this.policyType )
      .subscribe( ( offer ) => {
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
        this.setCalEntry( this.offer );
      } );
  }

  closeOffer() {
    this.navCtrl.navigateRoot( '/policy' );
  }

  backToOffer() {
    this.viewMode = 'V';
    this.headerConfig = subPageHeaderSecondary( 'Oferta de asigurare' );
  }

  gotoConditions() {
    this.viewMode = 'C';
    this.headerConfig = subPageHeaderDefault( 'Condiţii de asigurare' );
    this.headerConfig.leadingIcon.routerLink = false;
  }

  setCalEntry( offer: PolicyOffer ) {
    const date = get( offer, 'expiry', null );
    let processedDate;
    try {
      processedDate = Date.parse( date );
      this.calEntry = {
        title: 'Expirare oferta ' + get( offer, 'policy.name', '' ),
        location: 'Romania',
        notes:
          'Oferta ' + offer.id + ' expira la ' + dateHelperDMY( processedDate ),
        startDate: this.policyDataService.getEightDayBeforeExpiryDate(
          processedDate
        ),
        endDate: new Date( processedDate ),
        options: {
          firstReminderMinutes: 15,
          calendarName: 'offer',
        },
      };
    } catch ( e ) { }
  }

  addCalendarEntry() {
    this.policyDataService.addExpiryCalendarEntry( this.calEntry );
  }

  pay() {
    // Starting the payment workflow here
    this.busy = true;
    const data = {
      ibaN_1: this.offer.iban,
      amount_IBAN_1: this.offer.firstPaymentValue,
      areTermsAccepted: true,
      currencyToPay:
        this.policyType === 'PAD'
          ? 'RON'
          : this.offer.policy.locuintaData.valueCurrency,
      policyCurrency:
        this.policyType === 'PAD'
          ? 'RON'
          : this.offer.policy.locuintaData.valueCurrency,
      policyCode: this.offer.offerCode,
      isMobilePayment: true,
    };
    this.sub = this.policyDataService.makePayment( data ).subscribe(
      ( dataV ) => {
        if ( isPlatform( 'ios' ) ) {
          this.openIAB( dataV.url, '_blank' );
        } else {
          this.openIAB( dataV.url, '_blank' );
        }
        this.busy = false;
      },
      ( err ) => ( this.busy = false )
    );
    return;
  }

  openIAB(url, type) {
    const options =
      'location=no,footer=no,hardwareback=no,hidenavigationbuttons=yes,clearcache=yes,clearsessioncache=yes,toolbar=no';
    const browser = this.iab.create(url, type, options);
    browser.show();
    // TODO: linter complains, this is to be retested.
    if ( browser ) {
      this.sub = browser.on( 'loadstart' ).subscribe( ( e ) => {
        browser.insertCSS( { code: '.header__cancel{ display: none;}' } );
        if ( e && e.url.includes( 'tok' ) ) {
          this.confirmToken( e.url, browser );
        }
      } );
      this.sub = browser.on( 'loadstop' ).subscribe( ( e ) => {
        browser.insertCSS( { code: '.header__cancel{ display: none;}' } );
      } );
      this.sub = browser.on( 'loaderror' ).subscribe( ( e ) => {
        browser.close();
      } );
      browser
        .on( 'exit' )
        .pipe( first() )
        .subscribe( ( e ) => {
          this.sub.unsubscribe();
        } );
    }
  }

  confirmToken( urlPath, browser: InAppBrowserObject ) {
    const url = new URL( urlPath ).search;
    const urlParams = new URLSearchParams( url );
    const token = urlParams.get( 'tok' );
    this.policyDataService.confirmPayment( token, this.policyType ).subscribe(
      ( data ) => {
        browser.close();
        if (
          ( this.policyType === 'PAD' && get( data, 'padPolitaResponse', null ) ) ||
          ( this.policyType === 'AMPLUS' &&
            get( data, 'amplusPolitaResponse', null ) )
        ) {
          this.presentModal( 'success' );
          this.policyDataService.initData();
        } else {
          this.presentModal( 'failed', 'Plata a esuat!' );
        }
      },
      ( err ) => {
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
    const modal = await this.modalController.create( {
      component: PaymentStatusComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        paymentStatus,
        failureReason,
      },
    } );
    return await modal.present();
  }

  downloadAmplusOffer() {
    const title = `amplus-offer-${this.offer.amplusOfferDocumentId}.pdf`;
    const id = parseInt(this.offer.amplusOfferDocumentId, 10);
    if (id === 0) {
      return this.presentDocModal('Documentul nu este disponibil', 'Documentul este in curs de pregatire. Reincercati mai tarziu.');
    }
    this.storeS.getItem(title).subscribe((fileObj) => {
        if (fileObj) {
          this.prepareDoc(title);
        } else {
          this.downloading = true;
          this.amplusService
          .getAmplusOfferDocument(id)
          .subscribe((offerDocument) => {
            if (offerDocument) {
                this.storeS.setItem(title, offerDocument).subscribe((_) => {
                  this.prepareDoc(title);
                });
              }
            this.downloading = false;
            });
        }
      });
  }

  downloadPadOffer() {
    // TODO checked if doc has been downloaded earlier or fetch do from WS...
    const title = `offer-${this.offer.padOfferDocumentId}.pdf`;
    const id = parseInt(this.offer.padOfferDocumentId, 10);
    if (id === 0) {
      return this.presentDocModal('Documentul nu este disponibil', 'Documentul este in curs de pregatire. Reincercati mai tarziu.');
    }
    this.storeS.getItem(title).subscribe((fileObj) => {
      if (fileObj) {
        this.prepareDoc(title);
      } else {
        this.downloading = true;
        this.padService
          .getPadOfferDocument(id)
          .subscribe((offerDocument) => {
            if (offerDocument) {
              this.storeS.setItem(title, offerDocument).subscribe((_) => {
                this.prepareDoc(title);
              });
            }
            this.downloading = false;
          });
      }
    });
  }

  /**
   *
   * @param docTitle  title you want to name the doc when the user saves it;
   * Also Note that a title should always end with the file extenstion type. (e.g) 'title.pdf'
   */
  prepareDoc(docTitle: string) {
    // TODO converts base64 to blob data so it can be read: this algorithms makes data processing easy... as the conversion is graudal
    this.storeS.getItem(docTitle).subscribe((fileObj: any) => {
      const blobPdfFromBase64String = () => {
        const byteArray = Uint8Array.from(
          atob(fileObj.file)
            .split('')
            .map((char) => char.charCodeAt(0))
        );
        return new Blob([byteArray], { type: 'application/pdf' });
      };
      this.openFile(blobPdfFromBase64String(), docTitle);
    });
  }

  openFile(blob: Blob, docTitle: string) {
    //  Determine a native file path to save to
    let filePath: any;
    if (isPlatform('android')) {
      filePath = this.file.externalDataDirectory;
    }
    if (isPlatform('ios')) {
      filePath = this.file.documentsDirectory;
    } else {
      filePath = this.file.dataDirectory;
    }
    this.file
      .writeFile(filePath, docTitle, blob, { replace: true })
      .then((fileEntry: FileEntry) => {
          this.fileOpener.showOpenWithDialog(fileEntry.toURL(), 'application/pdf')
            .then(() => {
            // TODO nothing should be done here
          })
            .catch(e => {
            // TODO: error handling maybe needed here...
          });
      })
      .catch((err) => {
        // TODO: error handling may be needed here too...
      });
  }

  async presentDocModal(title, description) {
    const modal = await this.modalController.create({
      component: DownloadErrorModalComponent,
      cssClass: 'disabled-message-modal-class',
      componentProps: {
        title,
        description,
      },
    });
    return await modal.present();
  }
}
