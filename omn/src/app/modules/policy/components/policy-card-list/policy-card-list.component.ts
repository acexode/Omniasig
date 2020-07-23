import {
  Component,
  OnInit,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ImageCard } from 'src/app/shared/models/component/image-card';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-policy-card-list',
  templateUrl: './policy-card-list.component.html',
  styleUrls: ['./policy-card-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyCardListComponent implements OnInit {
  @Input() items: Array<ImageCard> = [];
  @Input() title: IonTextItem = null;
  constructor() {}

  ngOnInit() {}
}
