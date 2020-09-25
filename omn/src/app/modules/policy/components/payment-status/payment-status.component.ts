import { Component, Input, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-payment-status',
  templateUrl: './payment-status.component.html',
  styleUrls: ['./payment-status.component.scss'],
})
export class PaymentStatusComponent implements OnInit {
  @Input() paymentStatus: 'failed' | 'success' = null
  failureReason: string = null
  constructor(private navCtrl: NavController,
    public modalController: ModalController) { }

  ngOnInit() {
  }
  goHome() {
    this.navCtrl.navigateRoot('/home').then(() => {
      this.modalController.dismiss();
    })
  }
}
