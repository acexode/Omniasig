import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCard } from '../../models/component/image-card';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.scss'],
})
export class ImageCardComponent implements OnInit {
  @Input() item: ImageCard;

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
