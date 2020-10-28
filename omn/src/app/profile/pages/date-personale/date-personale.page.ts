import { Component, HostBinding, OnInit } from '@angular/core';
import { get } from 'lodash';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { ConfigService } from 'src/app/core/services/config/config.service';
import { LocuinteService } from 'src/app/profile/pages/locuinte/services/locuinte/locuinte.service';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { Locuinte } from 'src/app/shared/models/data/locuinte.interface';
import { Account } from '../../../core/models/account.interface';
import { AuthService } from '../../../core/services/auth/auth.service';

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
  headerConfig = subPageHeaderDefault('Date Personale', '/profil');
  domiciliu: Locuinte;
  otherAddresses: Array<Locuinte>;
  domiciliu$ = new BehaviorSubject(null);
  otherAddresses$ = new BehaviorSubject([]);

  constructor(
    private authS: AuthService,
    private configS: ConfigService,
    private locuinteService: LocuinteService
  ) {
    this.locuinteService.locuinteStore$.pipe(
      distinctUntilChanged(),
    ).subscribe((vals) => {
      if (vals instanceof Array) {
        this.domiciliu$.next(vals.find((l) => {
          return get(l, 'isHomeAddress', false) === true;
        }));
        this.otherAddresses$.next(vals.filter((loc) => {
          return get(loc, 'isHomeAddress', false) === false;
        }));
      } else {
        return null;
      }
    });
  }

  ngOnInit() {
    combineLatest([
      this.account$,
      this.domiciliu$,
      this.otherAddresses$,
    ]).subscribe(([account, domiciliu, otherAd]) => {
      if (account) {
        this.accountData = account;
        this.accountActivated = this.authS.accountActivated(account);
      }
      this.domiciliu = domiciliu;
      this.otherAddresses = otherAd;
    });
  }
}
