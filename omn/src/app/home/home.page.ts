import { unsubscriberHelper } from './../core/helpers/unsubscriber.helper';
import { get } from 'lodash';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
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
import { Keyboard } from '@ionic-native/keyboard/ngx';
import { distinctUntilChanged } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage implements OnInit, OnDestroy {
  release = this.configS.release();
  dauneDisabled = dauneDisabled;
  hasOffers = false;
  accountActivated = false;
  offers$: BehaviorSubject<Array<PolicyListItem>> = new BehaviorSubject([]);
  policies$: BehaviorSubject<Array<PolicyListItem>> = new BehaviorSubject([]);
  account = null;
  daune: Array<ImageCard> = null;

  isDisableNotificationIcon = true;

  // Default title configs.
  oferteTitle: IonTextItem = {
    text: 'Oferte',
    classes: 'color-white',
    color: 'omn-transparent-white',
  };
  asigTitle: IonTextItem = {
    text: 'Asigur??ri',
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
        text: 'Nici o poli???? activ??',
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
      routerLink: '/call-center',
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
        color: 'primary',
        classes: 'icon-40 mt-16 mb-0 ion-align-self-start',
      },
      textContent: [
        {
          text: '??ntreb??ri frecvente',
        },
      ],
      id: '0',
      routerLink: '/home',
      itemClass: 'mh-104',
    },
  ];

  // Placeholder for account activation.
  biometricCard = {
    mainIcon: {
      name: 'md-user-light',
      color: 'green-gradient',
      classes: 'icon-32 mt-0 ion-align-self-start',
    },
    textContent: [],
    id: 'account',
    itemClass: 'flex-1 mt-n16 p-16 mb-12',
    isButton: true,
    isHidden: false,
    routerLink: ['/biometrics'],
  };
  emailCard = {
    mainIcon: {
      name: 'md-email-light',
      color: 'green-gradient',
      classes: 'icon-32 mt-0 mx-0 ion-align-self-start',
    },
    textContent: [],
    id: 'email',
    isButton: true,
    isHidden: false,
    routerLink: ['/profil', 'date-personale', 'validate-email'],
    itemClass: 'flex-1 mt-n16 p-16 mb-12',
  };
  accountNotActivated: DisabledPlaceholderCard = {
    leftColumnClass: 'flex-0',
    rightColumnClass: 'pr-0 py-16',
    cards: [],
    textContent: [
      {
        text: 'Activeaz??-??i contul',
        classes:
          'pt-0 px-0 h3 alt-font text-weight-bold mb-8 flex color-dark-green',
      },
      {
        text:
          'Pentru a activa contul, valideaz??-??i adresa de e-mail ??i verific?? identitatea.',
        classes: 'p-0 mb-8 ion-text-left link-small text-normal flex',
        color: 'black',
      },
    ],
    id: null,
    routerLink: null,
    itemClass: null,
    color: null,
  };
  sub: Subscription;
  constructor(
    private menu: MenuController,
    private authS: AuthService,
    private policyS: PolicyDataService,
    private cdRef: ChangeDetectorRef,
    private configS: ConfigService,
    private keyboard: Keyboard
  ) {
    if (this.release === 2) {
      this.daune = testDauneData.concat(addDaune);
    }
  }

  ngOnInit(): void {
    // TODO: next time this issue shows up, move it to a navigation-based check.
    if (this.keyboard.isVisible) {
      this.keyboard.hide();
    }
    unsubscriberHelper(this.sub);
    this.sub = this.authS.getAccountData().subscribe((account) => {
      this.account = account;
      if (account) {
        this.policyS.initData();
        // activate display for what needs validation from user
        this.displayWhatNeedsToBeValidated(this.account);
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

  displayWhatNeedsToBeValidated(acc: Account) {
    const cardList = [];

    if (!this.account.isEmailConfirmed) {
      // email
      cardList.push({
        ...this.emailCard,
        ...{
          itemClass: !this.account.isBiometricValid
            ? 'p-16 flex-1 mb-16'
            : 'flex-1 mt-n16 p-16 mb-12',
        },
      });
    }
    if (!this.account.isBiometricValid) {
      // biometrics
      cardList.push({ ...this.biometricCard });
    }

    this.accountNotActivated.cards = cardList;
    this.cdRef.markForCheck();
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

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
