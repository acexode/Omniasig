import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { PolicyListItem } from 'src/app/shared/models/component/policy-list-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-policy-list',
  templateUrl: './policy-list.component.html',
  styleUrls: ['./policy-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolicyListComponent implements OnInit {
  @Input() title?: IonTextItem;
  @Input() list: Array<PolicyListItem>;
  @Input() emptyItem: PolicyListItem;

  @Output() itemEvent: EventEmitter<{
    type: string;
    data: any;
  }> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  emitItemEvent(eventName, item) {
    this.itemEvent.emit({ type: eventName, data: item });
  }
}
