import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-asistenta-modal-page',
  templateUrl: './asistenta-modal-page.page.html',
  styleUrls: ['./asistenta-modal-page.page.scss'],
})
export class AsistentaModalPagePage implements OnInit {
  @Input() type: string;
  constructor(public modalCtrl: ModalController) {}

  ngOnInit() {}
  closeModal() {
    this.modalCtrl.dismiss({
      dismissed: true,
    });
  }
}
