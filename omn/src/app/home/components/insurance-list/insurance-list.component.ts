import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { InsuranceListItem } from 'src/app/shared/models/component/insurance-list-item';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';

@Component({
  selector: 'app-insurance-list',
  templateUrl: './insurance-list.component.html',
  styleUrls: ['./insurance-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InsuranceListComponent implements OnInit {
  @Input() title?: IonTextItem;
  @Input() list: Array<InsuranceListItem>;
  @Input() emptyItem: InsuranceListItem;

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
