import { SettingsService } from './../../../modules/setari/services/settings.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { Account } from '../../../core/models/account.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Component({
  selector: 'app-date-personale',
  templateUrl: './date-personale.page.html',
  styleUrls: ['./date-personale.page.scss'],
})
export class DatePersonalePage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  release = this.configS.release();
  accountActivated: boolean;
  account$ = this.authS.getAccountData();
  accountData: Account;
  headerConfig = subPageHeaderDefault('Date Personale');
  domiciliu: any = null
  constructor(private authS: AuthService, private configS: ConfigService, private settingsS: SettingsService) { }

  ngOnInit() {
    this.account$.subscribe((account) => {
      if (account) {
        this.accountData = account;
        this.accountActivated = this.authS.accountActivated(account);
      }
    });
    this.getDomiciliu()
  }

  getDomiciliu() {
    this.settingsS.domiciliu$.subscribe(
      (data) => {
        this.domiciliu = data;
      }
    )
  }
}
