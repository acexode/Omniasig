import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { Account } from 'src/app/core/models/account.interface';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { policyTypes } from 'src/app/shared/models/data/policy-types';
import { offerItemHelper } from '../../data/main-offer-item-helper';
import { policyItemHelper } from '../../data/main-policy-item-helper';
import { policySalesItemHelper } from '../../data/main-policy-sales-item';
import { policyListTitles } from '../../data/policy-list-titles';
import { PolicyDataService } from '../../services/policy-data.service';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.scss'],
})
export class PolicyComponent implements OnInit {
  @ViewChild('footerButtons', { static: true }) footerButtons;
  titles = { ...policyListTitles };
  hasOffers = false;
  accountActivated = false;
  offers$: BehaviorSubject<Array<ImageCard>> = new BehaviorSubject([]);
  policies$: BehaviorSubject<Array<ImageCard>> = new BehaviorSubject([]);
  salesItems$: BehaviorSubject<Array<ImageCard>> = new BehaviorSubject([]);
  account$ = this.authS.getAccountData();

  constructor(
    private menu: MenuController,
    private authS: AuthService,
    private policyS: PolicyDataService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.account$.subscribe((account) => {
      if (account) {
        this.buildSalesItems(account);
        this.accountActivated = this.authS.accountActivated(account);
        if (this.accountActivated) {
          this.reQPolicies(account);
          this.reqOffers(account);
        }
      }
    });
  }

  openCustom() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
  }

  /**
   * Request user Policies data.
   * @param account - User account
   */
  reQPolicies(account: Account) {
    this.policyS.getUserPolicies(account.id).subscribe((policies) => {
      if (policies) {
        this.policies$.next(
          policies.map((p) => policyItemHelper(p, account, null))
        );
      } else {
        this.policies$.next([]);
      }
    });
  }

  /**
   * Request user Offers data.
   * @param account - User account
   */
  reqOffers(account: Account) {
    this.policyS.getUserOffers(account.id).subscribe((offers) => {
      if (offers && offers.length > 0) {
        this.offers$.next(offers.map((o) => offerItemHelper(o, account, null)));
      } else {
        this.offers$.next([]);
      }
      this.cdRef.markForCheck();
    });
  }

  buildSalesItems(account: Account) {
    const salesList = Object.values(policyTypes).map((pT) => {
      const item = policySalesItemHelper(pT, account, this.footerButtons);
      return item;
    });
    this.salesItems$.next(salesList);
  }
}
