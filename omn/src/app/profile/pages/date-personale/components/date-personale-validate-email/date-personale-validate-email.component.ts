import { Component, HostBinding, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-date-personale-validate-email',
  templateUrl: './date-personale-validate-email.component.html',
  styleUrls: ['./date-personale-validate-email.component.scss'],
})
export class DatePersonaleValidateEmailComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  constructor(public actionSheetController: ActionSheetController) {}

  ngOnInit() {}

  async openVerifyModal() {
    let actionSheet = null;
    this.actionSheetController
      .create({
        header: 'Verifică inbox',
        buttons: [
          {
            text: 'Deschide e-mail',
            cssClass:
              'm-0 w-100 no-shadow ion-color text-weight-medium ion-color-success button button-block button-large button-solid',
            handler: () => {
              console.log('Share clicked');
            },
          },
          {
            text: 'Renunță',
            role: 'cancel',
            cssClass:
              'm-0 w-100 no-shadow ion-color-secondary button button-block button-large button-solid',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
        ],
      })
      .then((v) => {
        actionSheet = v;
        actionSheet.present();
      });
  }
}
