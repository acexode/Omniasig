import { Component, HostBinding, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras } from '@angular/router';
import { NavController } from '@ionic/angular';
import { get, has } from 'lodash';
import { take } from 'rxjs/operators';
import { dateHelperDMY } from 'src/app/core/helpers/date.helper';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { PolicyDataService } from '../../services/policy-data.service';
import { CalendarEntry } from '../models/calendar-entry';
import { PadService } from '../../services/pad.service';

@Component({
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],
})
export class OfferViewComponent implements OnInit {
  policyType;
  offer: PolicyOffer = null;
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
  constructor(
    private route: ActivatedRoute,
    private policyDataService: PolicyDataService,
    private padS: PadService,
    private navCtrl: NavController
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
      //console.log("POLICY GOTTEN BY ID", this.offer);
      this.setCalEntry(this.offer);
    });
  }

  closeOffer() {
    this.navCtrl.navigateRoot('/policy');
  }

  gotoConditions() {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        policyType: this.policyType,
      },
    };
    this.navCtrl.navigateForward(['/policy', 'conditions'], navigationExtras);
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

  pay() {
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
}
