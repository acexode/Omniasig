import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  ChangeDetectorRef,
  Output,
  EventEmitter,
} from '@angular/core';
import { DntConfig } from '../../models/dnt-config';
import { DntItemConfig } from '../../models/dnt-item-config';
import { get } from 'lodash';

@Component({
  selector: 'app-dnt',
  templateUrl: './dnt.component.html',
  styleUrls: ['./dnt.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DntComponent implements OnInit {
  vConfig: DntConfig;
  visibleItem: DntItemConfig;
  visibleItemIndex = null;
  @Output() dntEvents: EventEmitter<'success' | 'error'> = new EventEmitter();
  @Input() set config(conf: DntConfig) {
    this.vConfig = conf;
    const items = get(conf, 'items', []);
    if (items.length) {
      this.visibleItemIndex = 0;
      this.visibleItem = items[0];
    }
  }
  constructor(private cdRef: ChangeDetectorRef) {}

  navigateInList() {}

  navigateToSuccess() {}

  ngOnInit() {}
}
