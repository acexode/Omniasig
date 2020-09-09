import { CalendarEntry } from './../models/calendar-entry';
import { get } from 'lodash';
import { NavController } from '@ionic/angular';
import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { ActivatedRoute } from '@angular/router';
import { PolicyDataService } from '../../services/policy-data.service';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  offer: any;
  policyType;
  headerConfig = subPageHeaderSecondary('Oferta de asigurare');
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
    `600 EUR sau echivalent RON pentru închirierea unui spaţiu de locuit, situație generată de lipsa de folosinţă a locuinţei asigurate din cauza producerii unui eveniment asigurat (perioada maximă de despăgubire 6 luni);`,
    `<p class="m-0"><span class="text-weight-bold">Cheltuieli cu prevenirea daunelor –</span> sublimita 10% din suma asigurată a bunurilor amenintate de evenimentul respectiv;</p>`,
    `<p class="m-0"><span class="text-weight-bold">Cheltuieli pentru stingerea oricarui incendiu –</span> sublimita 10% din suma asigurată a bunurilor afectate de incendiu;</p>`,
    `<p class="m-0"><span class="text-weight-bold">Cheltuieli pentru limitarea daunelor –</span> sublimită de 10% din suma asigurată a bunurilor afectate de evenimentul asigurat respectiv;</p>`,
    `<p class="m-0"><span class="text-weight-bold">Cheltuieli pentru efectuarea lucrarilor de curațare in urma unui eveniment asigurat –</span> sublimita 10% din suma asigurată a bunurilor afectate;</p>`,
    `<p class="m-0"><span class="text-weight-bold">Cheltuieli cu expertizarea daunelor –</span> sublimita 10% din suma asigurată a bunurilor afectate, max 1.000 EUR/ eveniment;</p>`,
    `<p class="m-0"><span class="text-weight-bold">În cazul asigurării riscului de furt, costuri / cheltuieli ocazionate de:</span> daune produse prin spargerea sau deteriorarea cu prilejul furtului sau tentativei de furt prin efracţie, curăţarea sau înlocuirea încuietorilor avariate pentru o sublimită a 10% din suma asigurată a bunurilor conţinute asigurate max 1.000 EUR / eveniment;</p>`,
    `<p class="m-0"><span class="text-weight-bold">În cazul asigurării răspunderii civile, cheltuielile</span> efectuate de către Asigurat în procesul civil, dacă a fost obligat la plata unor despăgubiri, decurgând din evenimente asigurate produse în perioada de asigurare.</p>`,
  ];

  calEntry: CalendarEntry;
  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private navCtrl: NavController
  ) {
    this.route.params.subscribe((params: any) => {
      this.getPolicyById(params.id);
    });
    this.policyType = this.route.snapshot.queryParamMap.get('policyType');
  }

  ngOnInit(): void {}

  getPolicyById(id) {
    this.policyDataService.getSingleOfferById(id).subscribe((offer) => {
      this.offer = offer instanceof Array ? offer[0] : offer;
      this.setCalEntry(this.offer);
    });
  }

  closeOffer() {
    this.navCtrl.navigateRoot('/policy');
  }

  gotoConditions() {
    this.navCtrl.navigateForward(['/policy', 'conditions']);
  }

  back() {}

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
}
