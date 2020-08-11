import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DisabledMessageModalComponent } from '../modals/disabled-message-modal/disabled-message-modal.component';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-policy-card-list',
  templateUrl: './policy-card-list.component.html',
  styleUrls: ['./policy-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyCardListComponent implements OnInit {
  @Input()
  items: Array<ImageCard> = [];
  @Input() title: IonTextItem = null;
  constructor(public modalController: ModalController) {}

  ngOnInit() {}

  async presentModal(index) {
    console.log(this.items[index]);
    const modal = await this.modalController.create({
      component: DisabledMessageModalComponent,
      cssClass: 'my-custom-modal-class',
    });
    return await modal.present();
  }
}
