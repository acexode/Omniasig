import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-disabled-message-modal',
  templateUrl: './disabled-message-modal.component.html',
  styleUrls: ['./disabled-message-modal.component.scss'],
})
export class DisabledMessageModalComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  @Input() item: any;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss();
  }
}
