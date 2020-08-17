import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { PolicyText } from 'src/app/shared/models/data/policy-types';
import { DisabledMessageModalComponent } from '../modals/disabled-message-modal/disabled-message-modal.component';

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
    // console.log(this.items);

    const modal = await this.modalController.create({
      component: DisabledMessageModalComponent,
      cssClass: 'disabled-message-modal-class',
      componentProps: {
        item: this.items[index],
        description: PolicyText[index],
      },
    });
    return await modal.present();
  }
}
