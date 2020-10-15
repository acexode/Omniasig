import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-download-error-modal',
  templateUrl: './download-error-modal.component.html',
  styleUrls: ['./download-error-modal.component.scss'],
})
export class DownloadErrorModalComponent implements OnInit {
  @Input() title;
  @Input() description;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
