import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { get } from 'lodash';
import { IonTextItem } from './../../models/component/ion-text-item';

@Component({
  selector: 'app-generic-error',
  templateUrl: './generic-error.component.html',
  styleUrls: ['./generic-error.component.scss'],
})
export class GenericErrorComponent implements OnInit, OnChanges {
  @Input() title = {
    text: 'Ne pare rău...',
    class: '',
  };
  @Input() texts: Array<IonTextItem> = [
    {
      classes: 'text-weight-medium  mb-16',
      text: 'A fost identificată o problema...',
    },
    {
      classes: '',
      text: 'Te rugăm să iei legătura cu un reprezentant OMNIASIG.',
    },
  ];
  @Output() doClose: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (this.title == null) {
      this.title = {
        text: 'Ne pare rău...',
        class: '',
      };
    }
    if (!this.texts || get(this.texts, 'length', 0) === 0) {
      this.texts = [
        {
          classes: 'text-weight-medium mb-16',
          text: 'A fost identificată o problema...',
        },
        {
          classes: '',
          text: 'Te rugăm să iei legătura cu un reprezentant OMNIASIG.',
        },
      ];
    }
  }

  close() {
    this.doClose.emit(true);
  }
}
