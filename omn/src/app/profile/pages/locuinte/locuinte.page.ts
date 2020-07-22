import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-locuinte',
  templateUrl: './locuinte.page.html',
  styleUrls: ['./locuinte.page.scss'],
})
export class LocuintePage implements OnInit {
  headerConfig = subPageHeaderDefault('Locuințe');
  accountActivated: boolean;
  account$ = this.authS.getAccountData();
  cards: Array<ImageCard> = [
    {
      mainIcon: {
        name: 'md-pin-ling',
        color: 'green-gradient',
        classes: 'icon-40 mt-16 mb-8',
      },
      textContent: [
        {
          text: 'Acasă Traian 45, Brasov',
        },
      ],
      id: 'places',
      itemClass: 'mh-104 shadow-page-item',
      isButton: true,
      // routerLink: ['locuinte'],
    },
  ];

  constructor(
    public actionSheetController: ActionSheetController,
    private authS: AuthService
  ) {}

  ngOnInit() {
    this.account$.subscribe((account) => {
      if (account) {
        this.accountActivated = this.authS.accountActivated(account);
      }
    });
  }

  async openVerifyModal() {
    let actionSheet = null;
    this.actionSheetController
      .create({
        // header: 'trash',
        buttons: [
          {
            text: '',
            icon: 'certificat',
            role: 'destruction',
            cssClass: 'm-0 w-100 no-shadow',
            // handler: () => {
            //   console.log('here');
            // },
          },
          {
            text: 'Renunță',
            role: 'cancel',
            handler: () => {
              console.log('here');
            },
            cssClass:
              'm-0 w-100 no-shadow ion-color-secondary button button-block button-large button-solid',
          },
        ],
      })
      .then((v) => {
        actionSheet = v;
        actionSheet.present();
      });
  }
}
