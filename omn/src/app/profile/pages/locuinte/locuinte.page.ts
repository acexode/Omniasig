import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { LocuinteService } from 'src/app/core/services/locuinte/locuinte.service';
import { Locuinte } from 'src/app/shared/models/data/locuinte';

@Component({
  selector: 'app-locuinte',
  templateUrl: './locuinte.page.html',
  styleUrls: ['./locuinte.page.scss'],
})
export class LocuintePage implements OnInit {
  headerConfig = subPageHeaderDefault('Locuințe');
  accountActivated: boolean;
  account$ = this.authS.getAccountData();
  cards: Array<Locuinte> = [];

  constructor(
    public actionSheetController: ActionSheetController,
    private authS: AuthService,
    private locuinteS: LocuinteService
  ) {}

  ngOnInit() {
    this.account$.subscribe((account) => {
      if (account) {
        this.accountActivated = this.authS.accountActivated(account);
        this.reQLocuintes();
      }
    });
  }

  reQLocuintes() {
    this.locuinteS.getUserLocuinte().subscribe((locuintes) => {
      this.cards = locuintes;
    });
  }

  async openVerifyModal() {
    let actionSheet = null;
    this.actionSheetController
      .create({
        cssClass: 'locuinte-sheet',
        buttons: [
          {
            text: '',
            icon: 'certificat',
            cssClass: 'mt-24 w-100 no-shadow remove-event certificat',
          },
          {
            text: 'Atenție!',
            cssClass: 'm-0 w-100 no-shadow remove-event atentie alt-font',
          },
          {
            text:
              'Nu poți asigura o locuință prin intermediul aplicației decât dacă ești proprietarul ei.!',
            cssClass: 'm-0 w-100 mb-16 no-shadow remove-event',
          },
          {
            text: 'Am înțeles!',
            cssClass:
              'm-0 w-100 no-shadow ion-color text-weight-medium ion-color-success flat button button-block button-large button-solid',
          },
        ],
      })
      .then((v) => {
        actionSheet = v;
        actionSheet.present();
      });
  }
}
