import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/services/auth/auth.service';
import { ConfigService } from '../core/services/config/config.service';
import { PolicyDataService } from '../modules/policy/services/policy-data.service';
import { DisabledPlaceholderCard } from '../shared/models/component/disabled-placeholder-card';
import { ImageCard } from '../shared/models/component/image-card';
import { IonTextItem } from '../shared/models/component/ion-text-item';
import { PolicyListItem } from '../shared/models/component/policy-list-item';
import { PolicyItem } from '../shared/models/data/policy-item';
import { PolicyOffer } from '../shared/models/data/policy-offer';
import { addDaune, dauneDisabled, testDauneData } from './data/home-daune-data';
import { offerHomeItemHelper } from './data/home-offer-item-helper';
import { policyHomeItemHelper } from './data/home-policy-item-helper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  release = this.configS.release();
  dauneDisabled = dauneDisabled;
  hasOffers = false;
  accountActivated = false;
  offers$: BehaviorSubject<Array<PolicyListItem>> = new BehaviorSubject([]);
  policies$: BehaviorSubject<Array<PolicyListItem>> = new BehaviorSubject([]);
  account = null;
  // remove
  isToAddToPage = false;
  ///
  daune: Array<ImageCard> = null;

  // Default title configs.
  oferteTitle: IonTextItem = {
    text: 'Oferte',
    classes: 'color-white',
    color: 'omn-transparent-white',
  };
  asigTitle: IonTextItem = {
    text: 'Asigurări',
    classes: 'color-white',
    color: 'omn-transparent-white',
  };

  // Use this as default for policy empty data.
  emptyItem: PolicyListItem = {
    id: '0',
    routerLink: null,
    itemClass: 'no-items',
    leftIcon: {
      name: 'md-no-policy-light',
      color: 'medium',
      classes: 'no-items icon-22',
    },
    rightIcon: null,
    textContent: {
      body: {
        text: 'Nici o poliță activă',
        classes: 'mb-0',
      },
    },
  };

  // Help items config.
  helpItems: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-call-center',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Call Center',
        },
      ],
      id: '0',
      routerLink: '/home',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'md-chat',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Chat',
        },
      ],
      id: '0',
      routerLink: '/home',
      itemClass: 'mh-104',
    },
    {
      mainIcon: {
        name: 'md-intrebari',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
      },
      textContent: [
        {
          text: 'Întrebări frecvente',
        },
      ],
      id: '0',
      routerLink: '/home',
      itemClass: 'mh-104',
    },
  ];

  // Placeholder for account activation.
  accountNotActivated: DisabledPlaceholderCard = {
    leftColumnClass: 'flex-0',
    rightColumnClass: 'pl-16 pr-0 py-16',
    cards: [
      {
        mainIcon: {
          name: 'md-user-light',
          color: 'green-gradient',
          classes: 'icon-32 mt-0 ion-align-self-start',
        },
        textContent: [],
        id: 'account',
        itemClass: 'flex-1 mt-n16 p-16 mb-12',
        routerLink: ['/biometrics'],
      },
      {
        mainIcon: {
          name: 'md-email-light',
          color: 'green-gradient',
          classes: 'icon-32 mt-0 mx-0 ion-align-self-start',
        },
        textContent: [],
        id: 'email',
        routerLink: ['/profil', 'date-personale', 'validate-email'],
        itemClass: 'p-16 flex-1 mb-16',
      },
    ],
    textContent: [
      {
        text: 'Activează-ți contul',
        classes: 'pt-0 px-0 h2 alt-font text-weight-bold mb-8 flex',
      },
      {
        text:
          'Pentru a activa contul, validează-ți adresa de e-mail și verifică identitatea.',
        classes: 'p-0 mb-2 ion-text-left text-normal flex',
      },
    ],
    id: null,
    routerLink: null,
    itemClass: null,
    color: null,
  };
  constructor(
    private menu: MenuController,
    private authS: AuthService,
    private policyS: PolicyDataService,
    private cdRef: ChangeDetectorRef,
    private configS: ConfigService
  ) {
    if (this.release === 2) {
      this.daune = testDauneData.concat(addDaune);
    }
  }

  ngOnInit(): void {
    this.authS.getAccountData().subscribe((account) => {
      this.account = account;
      if (account) {
        this.accountActivated = this.authS.accountActivated(account);
        if (this.accountActivated) {
          this.policyS.policyStore$.subscribe((v) =>
            this.policies$.next(this.mapPolicies(v))
          );
          this.policyS.offerStore$.subscribe((v) =>
            this.offers$.next(this.mapOffers(v))
          );
        }
      }
      this.cdRef.markForCheck();
    });
  }

  /**
   * Preprocess user Policies data.
   */
  mapPolicies(policies: Array<PolicyItem>) {
    if (policies) {
      return policies.map((p) => policyHomeItemHelper(p));
    } else {
      return [];
    }
  }

  /**
   * Preprocess user Offers data.
   */
  mapOffers(offers: Array<PolicyOffer>) {
    let newOff = [];
    if (offers && offers.length > 0) {
      newOff = offers.map((o) => offerHomeItemHelper(o));
      this.asigTitle.classes = 'color-dark-green';
      this.hasOffers = true;
    } else {
      newOff = [];
      this.asigTitle.classes = 'color-white';
      this.hasOffers = false;
    }
    this.asigTitle = { ...this.asigTitle };
    this.cdRef.markForCheck();
    return newOff;
  }

  openCustom() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
  }
}
