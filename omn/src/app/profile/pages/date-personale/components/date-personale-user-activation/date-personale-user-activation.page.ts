import { Component, OnInit, HostBinding } from '@angular/core';
import { UserActivateModes } from 'src/app/shared/models/modes/user-activate-modes';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderSecondary } from 'src/app/shared/data/sub-page-header-secondary';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Account } from 'src/app/core/models/account.interface';
@Component({
  selector: 'app-date-personale-user-activation',
  templateUrl: './date-personale-user-activation.page.html',
  styleUrls: ['./date-personale-user-activation.page.scss'],
})
export class DatePersonaleUserActivationPage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  userActivationModes = UserActivateModes;
  headerConfig: SubPageHeader = {
    ...subPageHeaderSecondary('Activare cont'),
    leadingIcon: null,
    trailingIcon: null,
  };
  displayMode: UserActivateModes = this.userActivationModes.EXISTING;
  itemClass = `py-8 flex-1 mb-16 ${
    this.displayMode === UserActivateModes.NEW_USER && 'lighter-green-gradient'
  }`;

  account: Account;
  accountActivated: boolean;
  biometricCard: ImageCard = {
    mainIcon: {
      name: 'md-user-light',
      color: 'green-gradient',
      classes: 'icon-40 mt-8 mx-0 ion-align-self-start',
    },
    textContent: [
      {
        text: 'Verificare identitate',
        classes: 'flex ion-justify-content-center px-8 ion-text-center',
      },
    ],
    id: 'validate-id',
    routerLink: ['/biometrics'],
    isHidden: false,
    itemClass: this.itemClass,
  };
  emailCard: ImageCard = {
    mainIcon: {
      name: 'md-email-light',
      color: 'green-gradient',
      classes: 'icon-40 mt-8 mx-0 ion-align-self-start',
    },
    textContent: [
      {
        text: 'Validare adresă e-mail',
        classes: 'flex ion-justify-content-center px-8 ion-text-center',
      },
    ],
    id: 'validate-email',
    isHidden: false,
    routerLink: ['/profil', 'date-personale', 'validate-email'],
    itemClass: this.itemClass,
  };
  actions: Array<ImageCard> = [this.biometricCard, this.emailCard];

  constructor(private authS: AuthService) {}

  ngOnInit(): void {
    this.authS.getAccountData().subscribe((account) => {
      this.account = account;
      if (this.account) {
        this.accountActivated = this.authS.accountActivated(account);
        if (!this.accountActivated) {
          if (this.account.isEmailConfirmed && this.account.isBiometricValid) {
            this.disableCard(this.biometricCard);
            this.disableCard(this.emailCard);
          } else if (this.account.isEmailConfirmed) {
            // email
            this.disableCard(this.emailCard);
          } else {
            // biometrics
            this.disableCard(this.biometricCard);
          }
        }
      }
    });
  }
  disableCard(card: ImageCard) {
    card.isDisabled = true;
  }
}
