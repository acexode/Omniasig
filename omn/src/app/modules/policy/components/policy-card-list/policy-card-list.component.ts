import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
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
  @Input()
  items: Array<ImageCard> = [];
  @Input() title: IonTextItem = null;
  @Output() itemEvent: EventEmitter<{
    type: string;
    data: any;
  }> = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  defaultEvent(event) {
    this.itemEvent.emit(event);
  }
}
