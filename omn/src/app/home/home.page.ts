import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from '../core/services/auth/auth.service';
import { PolicyDataService } from '../modules/policy/services/policy-data.service';
import { DisabledPlaceholderCard } from '../shared/models/component/disabled-placeholder-card';
import { ImageCard } from '../shared/models/component/image-card';
import { IonTextItem } from '../shared/models/component/ion-text-item';
import { PolicyListItem } from '../shared/models/component/policy-list-item';
import { dauneDisabled } from './data/home-daune-data';
import { offerHomeItemHelper } from './data/home-offer-item-helper';
import { policyHomeItemHelper } from './data/home-policy-item-helper';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit {
  release2 = false;
  dauneDisabled = dauneDisabled;
  hasOffers = false;
  accountActivated = false;
  offers$: BehaviorSubject<Array<PolicyListItem>> = new BehaviorSubject([]);
  policies$: BehaviorSubject<Array<PolicyListItem>> = new BehaviorSubject([]);
  account$ = this.authS.getAccountData();

  // DEMO:daune: Array<ImageCard> = testDauneData.concat(addDaune);
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
        classes: 'icon-40 mt-16',
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
        classes: 'icon-40 mt-16 mb-8',
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
        classes: 'icon-40 mt-16 mb-0',
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
          classes: 'icon-32 mt-0',
        },
        textContent: [],
        id: 'account',
        itemClass: 'flex-1 mt-n16 p-16 mb-12',
      },
      {
        mainIcon: {
          name: 'md-email-light',
          color: 'green-gradient',
          classes: 'icon-32 mt-0 mx-0',
        },
        textContent: [],
        id: 'email',
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
    private policyS: PolicyDataService
  ) {}

  ngOnInit(): void {
    this.account$.subscribe((account) => {
      if (account) {
        this.accountActivated = this.authS.accountActivated(account);
        if (this.accountActivated) {
          this.reQPolicies(account.id);
          this.reqOffers(account.id);
        }
      }
    });
  }

  /**
   * Request user Policies data.
   * @param id - User Id
   */
  reQPolicies(id: string | number) {
    this.policyS.getUserPolicies(id).subscribe((policies) => {
      if (policies) {
        this.policies$.next(policies.map((p) => policyHomeItemHelper(p)));
      } else {
        this.policies$.next([]);
      }
    });
  }

  /**
   * Request user Offers data.
   * @param id - User Id
   */
  reqOffers(id: string | number) {
    this.policyS.getUserOffers(id).subscribe((offers) => {
      if (offers && offers.length > 0) {
        this.offers$.next(offers.map((o) => offerHomeItemHelper(o)));
        this.asigTitle.classes = 'color-dark-green';
        this.hasOffers = true;
      } else {
        this.offers$.next([]);
        this.asigTitle.classes = 'color-white';
        this.hasOffers = false;
      }
    });
  }
  openCustom() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
    console.log(this.menu);
  }
}
