import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  NavController,
  ModalController,
} from '@ionic/angular';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
})
export class ConfirmationModalComponent implements OnInit {
  constructor(
    public actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    public modalCtrl: ModalController
  ) {}

  ngOnInit() {}

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
            handler: () => this.redirectToAddForm(),
          },
        ],
      })
      .then((v) => {
        actionSheet = v;
        actionSheet.present();
      });
  }

  redirectToAddForm() {
    this.dismiss();
    this.navCtrl.navigateForward('/profil/locuinte/add');
  }

  navigateBack() {
    this.dismiss();
    this.navCtrl.navigateBack('/profil/locuinte');
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
