import { Component, HostBinding, OnInit } from '@angular/core';
import { Account } from '../../../core/models/account.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-date-personale',
  templateUrl: './date-personale.page.html',
  styleUrls: ['./date-personale.page.scss'],
})
export class DatePersonalePage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  accountActivated: boolean;
  account$ = this.authS.getAccountData();
  accountData: Account;
  headerConfig = subPageHeaderDefault('Date Personale');
  constructor(private authS: AuthService) {}

  ngOnInit() {
    this.account$.subscribe((account) => {
      if (account) {
        this.accountData = account;
        this.accountActivated = this.authS.accountActivated(account);
      }
    });
  }
}
