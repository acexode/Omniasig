import { PaymentStatusComponent } from './../payment-status/payment-status.component';
import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ModalController } from '@ionic/angular';
import { get } from 'lodash';
import { take } from 'rxjs/operators';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { PolicyDataService } from '../../services/policy-data.service';
import { CalendarEntry } from '../models/calendar-entry';
import { PadService } from '../../services/pad.service';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser/ngx';
import { Url, UrlWithStringQuery } from 'url';


@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  offer: PolicyOffer = null;
  headerConfig = subPageHeaderSecondary('Oferta de asigurare');
  @HostBinding('class') color = 'ion-color-white-page';
  calEntry: CalendarEntry;
  busy: boolean = false
  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private padS: PadService,
    private navCtrl: NavController,
    public modalController: ModalController,
    private iab: InAppBrowser
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(take(1)).subscribe((params: any) => {
      this.getPolicyById(params.id);
    });
  }

  getPolicyById(id) {
    this.policyDataService.getSingleOfferById(id).subscribe((offer) => {
      this.offer = offer instanceof Array ? offer[0] : offer;
      this.setCalEntry(this.offer);
    });
  }

  closeOffer() {
    this.navCtrl.navigateRoot('/policy');
  }

  back() { }

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
    } catch (e) { }
  }

  addCalendarEntry() {
    this.policyDataService.addExpiryCalendarEntry(this.calEntry);
  }

  pay() {
    // Starting the payment workflow here
    this.busy = true
    const data = {
      ibaN_1: this.offer.iban,
      // TODO add the real amount of an offer (which i do not know right now)
      amount_IBAN_1: 1,
      areTermsAccepted: true,
      currencyToPay: this.offer.policy.locuintaData.valueCurrency,
      policyCurrency: this.offer.policy.locuintaData.valueCurrency,
      policyCode: this.offer.offerCode,
      isMobilePayment: true
    }
    this.policyDataService.makePayment(data).subscribe(
      (data) => {
        this.openIAB(data.url)
        this.busy = false
      },
      err => this.busy = false
    )

    return
    /*
      method to call payment web service when the pay(plateste) button is clicked,
      which also calls create PAD Insurance policy web service
    */
    const offerId = parseInt(this.offer.id, 10);
    this.padS.CreatePADInsurancePolicy(offerId).subscribe(
      (result) => {
        this.policyDataService.initData();
        this.navCtrl.navigateRoot('/policy');
        // next thing to do after creating PAD Insurance policy
      },
      (error) => {
        // handle error
        this.navCtrl.navigateRoot('/policy');
      }
    );
  }

  openIAB(url) {
    const browser = this.iab.create(url, '_blank', 'location=no');
    if (browser.on('loadstart').subscribe)
      browser.on('loadstart').subscribe((e) => {
        if (e && e.url.includes("tok")) {
          this.confirmToken(e.url, browser)
        }
      });
    if (browser.on('loaderror').subscribe)
      browser.on('loaderror').subscribe((e) => {
        browser.close()
      });
  }

  confirmToken(urlPath, browser: InAppBrowserObject) {
    let url = new URL(urlPath).search;
    const urlParams = new URLSearchParams(url);
    let token = urlParams.get('tok');
    this.policyDataService.confirmPayment(token).subscribe(
      (data) => {
        browser.close()
        this.presentModal('success')
      },
      (err) => {
        browser.close()
        this.presentModal('failed', err.error)
      }
    )
  }

  async presentModal(paymentStatus: 'failed' | 'success',
    failureReason?: string) {
    const modal = await this.modalController.create({
      component: PaymentStatusComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        paymentStatus,
        failureReason
      }
    });
    return await modal.present();
  }

}
