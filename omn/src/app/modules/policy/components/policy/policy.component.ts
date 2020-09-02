import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MenuController, NavController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Account } from 'src/app/core/models/account.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { policyTypes } from 'src/app/shared/models/data/policy-types';
import { offerItemHelper } from '../../data/main-offer-item-helper';
import {
  policyItemHelper,
  policyEmptyItemHelper,
} from '../../data/main-policy-item-helper';
import { policySalesItemHelper } from '../../data/main-policy-sales-item';
import { policyListTitles } from '../../data/policy-list-titles';
import { PolicyDataService } from '../../services/policy-data.service';
import { PolicyItem } from 'src/app/shared/models/data/policy-item';
import { PolicyOffer } from 'src/app/shared/models/data/policy-offer';
import { mainPolicyArchiveListItem } from '../../data/main-policy-archive-list-item';
import { ArchiveListItem } from 'src/app/shared/models/component/archive-list-item';
import { Router } from '@angular/router';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit, OnDestroy {
  @ViewChild('footerButtons', { static: true }) footerButtons;
  titles = { ...policyListTitles };
  hasOffers = false;
  accountActivated = false;
  offers$: BehaviorSubject<Array<ImageCard>> = new BehaviorSubject([]);
  policies$: BehaviorSubject<Array<ImageCard>> = new BehaviorSubject([]);
  policyArchive$: BehaviorSubject<Array<ArchiveListItem>> = new BehaviorSubject(
    []
  );
  salesItems$: BehaviorSubject<Array<ImageCard>> = new BehaviorSubject([]);
  account$ = this.authS.getAccountData();
  subsList = [];

  constructor(
    private menu: MenuController,
    private authS: AuthService,
    private policyS: PolicyDataService,
    private cdRef: ChangeDetectorRef,
    private router: Router,
    private navCtrl: NavController
  ) {}

  ngOnInit(): void {
    this.subsList.push(
      this.account$.subscribe((account) => {
        if (account) {
          this.accountActivated = this.authS.accountActivated(account);
          this.buildSalesItems(account);
          if (this.accountActivated) {
            this.subsList.push(
              this.policyS.policyStore$.subscribe((v) => {
                const policies = this.mapPolicies(v, account);
                if (policies.length) {
                  this.policies$.next(policies);
                } else {
                  this.policies$.next([policyEmptyItemHelper()]);
                }
              })
            );
            // TODO: Proper list
            this.subsList.push(
              this.policyS.policyStore$.subscribe((v) =>
                this.policyArchive$.next(this.mapPoliciesArchive(v))
              )
            );
            this.subsList.push(
              this.policyS.offerStore$.subscribe((v) =>
                this.offers$.next(this.mapOffers(v, account))
              )
            );
          }
        }
      })
    );
  }

  openCustom() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
  }

  /**
   * Preprocess user Policies data.
   */
  mapPolicies(policies: Array<PolicyItem>, account) {
    if (policies) {
      return policies.map((p) =>
        policyItemHelper(p, account, this.footerButtons)
      );
    } else {
      return [];
    }
  }

  /**
   * Preprocess user Policies data.
   */
  mapPoliciesArchive(policies: Array<PolicyItem>) {
    if (policies) {
      return policies.map((p) => mainPolicyArchiveListItem(p));
    } else {
      return [];
    }
  }

  /**
   * Request user Offers data.
   */
  mapOffers(offers: Array<PolicyOffer>, account) {
    if (offers && offers.length > 0) {
      return offers.map((o) => offerItemHelper(o, account, this.footerButtons));
    } else {
      return [];
    }
  }

  buildSalesItems(account: Account) {
    const salesList = Object.values(policyTypes).map((pT) => {
      return policySalesItemHelper(
        pT,
        account,
        this.accountActivated,
        this.footerButtons
      );
    });
    this.salesItems$.next(salesList);
  }

  ngOnDestroy(): void {
    this.subsList.forEach((ss) => {
      if (ss instanceof Subscription) {
        ss.unsubscribe();
      }
    });
    this.subsList = [];
  }

  eventHandler(event) {
    let policy;
    switch (event.data.id) {
      case 'AMPLUS':
        policy = policyTypes.AMPLUS;
        break;
      case 'PAD':
        policy = policyTypes.PAD;
        break;
      case 'Garant AMPLUS+ PAD':
        policy = policyTypes.AMPLUS_PAD;
        break;
      default:
        break;
    }

    this.router.navigate(['/policy', 'form'], {
      state: { policyType: policy },
    });
  }
}
