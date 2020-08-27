import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-policy-valoare-modal',
  templateUrl: './policy-valoare-modal.component.html',
  styleUrls: ['./policy-valoare-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyValoareModalComponent implements OnInit {
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
