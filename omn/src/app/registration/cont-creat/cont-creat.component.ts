import { AfterViewInit, Component, HostBinding, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { RegistrationService } from './../../core/services/auth/registration.service';
import { Account } from 'src/app/core/models/account.interface';
@Component( {
  selector: 'app-cont-creat',
  templateUrl: './cont-creat.component.html',
  styleUrls: [ './cont-creat.component.scss' ],
} )
export class ContCreatComponent implements OnInit, AfterViewInit {
  @HostBinding( 'class' ) color = 'ion-color-white-page';
  biometricCard = {
    mainIcon: {
      name: 'md-user-light-ling',
      color: 'green-gradient',
      classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
    },
    textContent: [
      {
        text: 'Verificare identitate',
      },
    ],
    id: 'account',
    itemClass: 'mh-104 shadow-page-item',
    isButton: true,
    isDisabled: false,
    routerLink: [ '/biometrics' ],
  };
  emailCard = {
    mainIcon: {
      name: 'md-email-light-ling',
      color: 'green-gradient',
      classes: 'icon-40 mt-16 mb-8 ion-align-self-start',
    },
    textContent: [
      {
        text: 'Validare adresă e-mail',
      },
    ],
    id: 'msg',
    itemClass: 'mh-104 shadow-page-item',
    isButton: true,
    isDisabled: false,
    routerLink: [ '/profil/date-personale/validate-email' ],
  };
  cards: Array<ImageCard> = [
    this.biometricCard, this.emailCard
  ];
  account: Account;
  accountActivated: boolean;
  constructor(
    private router: Router,
    private regService: RegistrationService,
    private authS: AuthService,
  ) { }

  ngOnInit(): void {
    this.authS.getAccountData().subscribe( ( account ) => {
      this.account = account;
      if ( this.account ) {
        this.accountActivated = this.authS.accountActivated( account );
        if ( !this.accountActivated ) {
          if ( this.account.isEmailConfirmed && this.account.isBiometricValid ) {
            this.disableCard( this.biometricCard );
            this.disableCard( this.emailCard );
          } else if ( this.account.isEmailConfirmed ) {
            // email
            this.disableCard( this.emailCard );
          } else {
            // biometrics
            this.disableCard( this.biometricCard );
          }
        }
      }
    } );
  }
  disableCard( card: ImageCard) {
    card.isDisabled = true;
  }
  ngAfterViewInit() {
    this.regService.clearUserObj();
  }
}
