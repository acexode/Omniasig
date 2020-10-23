import { DisabledPlaceholderCard } from './../../models/component/disabled-placeholder-card';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-account-not-activated',
  templateUrl: './account-not-activated.component.html',
  styleUrls: ['./account-not-activated.component.scss'],
})
export class AccountNotActivatedComponent implements OnInit {

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
