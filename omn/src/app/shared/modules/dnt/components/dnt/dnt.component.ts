import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { get } from 'lodash';
import { DntConfig } from '../../models/dnt-config';
import { DntItemConfig } from '../../models/dnt-item-config';

@Component({
  selector: 'app-dnt',
  templateUrl: './dnt.component.html',
  styleUrls: ['./dnt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DntComponent implements OnInit {
  vConfig: DntConfig;
  visibleItem: DntItemConfig;
  visibleItemIndex = -1;
  contentItems = [];
  successItem: DntItemConfig = null;
  cancelItem: DntItemConfig = null;

  @Output() dntEvents: EventEmitter<'success' | 'cancel'> = new EventEmitter();
  @Input() set config(conf: DntConfig) {
    this.vConfig = conf;
    this.contentItems = get(conf, 'items', []);
    this.cancelItem = get(conf, 'cancel', []);
    this.successItem = get(conf, 'success', []);

    if (this.contentItems.length) {
      this.navigateInList();
    }
    this.cdRef.markForCheck();
  }
  constructor(private cdRef: ChangeDetectorRef) {}

  navigateInList(type = 'next') {
    if (type === 'next' && this.contentItems[this.visibleItemIndex + 1]) {
      this.visibleItem = this.contentItems[this.visibleItemIndex + 1];
      this.visibleItemIndex = this.visibleItemIndex + 1;
      this.cdRef.markForCheck();
    }
  }

  navigateToSuccess() {}

  ngOnInit() {}

  buttonClick(type: 'start' | 'next' | 'end', data = null) {
    if (type === 'next') {
      if (this.visibleItemIndex === this.contentItems.length) {
        this.visibleItemIndex = -1;
        if (this.successItem) {
          this.visibleItem = this.successItem;
          this.cdRef.markForCheck();
        }
      } else {
        this.navigateInList(type);
      }
    }
  }
}
