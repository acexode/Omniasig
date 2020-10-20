import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { DisabledPlaceholderCard } from '../../models/component/disabled-placeholder-card';

@Component({
  selector: 'app-disabled-placeholder',
  templateUrl: './disabled-placeholder.component.html',
  styleUrls: ['./disabled-placeholder.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisabledPlaceholderComponent implements OnInit {
  @Input() item: DisabledPlaceholderCard;

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
