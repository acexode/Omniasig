import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-general-message-modal',
  templateUrl: './general-message-modal.component.html',
  styleUrls: ['./general-message-modal.component.scss'],
})
export class GeneralMessageModalComponent implements OnInit {
  @Input() title;
  @Input() description;
  @Input() alertType: null | 'info' | 'error' | 'success' = 'error';
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
