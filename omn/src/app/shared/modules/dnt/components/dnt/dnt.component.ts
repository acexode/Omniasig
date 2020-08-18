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

  @Output() dntEvents: EventEmitter<
    'success-ev' | 'cancel-ev' | 'success-btn' | 'cancel-btn' | number
  > = new EventEmitter();
  @Input() set config(conf: DntConfig) {
    this.vConfig = conf;
    this.contentItems = get(conf, 'items', []);
    this.cancelItem = get(conf, 'cancel', []);
    this.successItem = get(conf, 'success', []);
    const initialStep = get(conf, 'initialStep', null);

    if (this.contentItems.length) {
      if (initialStep !== null) {
        this.navigateInList('back', initialStep);
      } else {
        this.navigateInList();
      }
    }
    this.cdRef.markForCheck();
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit() {}

  public navigateInList(
    type: 'fwd' | 'back' = 'fwd',
    start: string | number = null
  ) {
    if (type === 'fwd') {
      // Only handle fwd navigation for now.
      const newItem = this.visibleItemIndex + 1;
      if (this.contentItems[newItem]) {
        this.visibleItem = this.contentItems[newItem];
        this.visibleItemIndex = newItem;
        if (this.visibleItemIndex > 0) {
          // Only emit in case multiple steps navigation.
          this.dntEvents.emit(this.visibleItemIndex);
        }
        this.cdRef.markForCheck();
      }
    } else {
      let newItem = -1;
      // We may need to provide a starting item in case parent wants to navigate.
      if (start === 'success' && this.successItem) {
        this.visibleItem = this.successItem;
        newItem = get(this.contentItems, 'length', -1);
        this.visibleItemIndex = newItem;
      } else if (start === 'cancel' && this.cancelItem) {
        this.visibleItem = this.successItem;
        newItem = get(this.contentItems, 'length', -1);
      } else if (start === 'success-ev') {
        newItem = get(this.contentItems, 'length', 0) - 1;
      } else {
        newItem = this.visibleItemIndex - 1;
      }
      // don't navigate if no item available.
      if (this.contentItems[newItem]) {
        this.visibleItemIndex = newItem;
        this.visibleItem = this.contentItems[newItem];
      }

      this.dntEvents.emit(newItem);
      this.cdRef.markForCheck();
      return this.visibleItemIndex;
    }
  }

  /**
   * All buttons will trigger an action
   *
   * @param type - Linked to the position in the template.
   * @param data - Pass additional data.
   */
  buttonClick(type: 'start' | 'end', data = null) {
    if (type === 'end') {
      this.dntEvents.emit(this.visibleItemIndex);

      if (this.visibleItemIndex === this.contentItems.length - 1) {
        // Reset visible items and redirect to the success.
        this.visibleItemIndex = -1;
        if (this.successItem) {
          // Emit redirect to success page state.
          this.dntEvents.emit('success-ev');
          this.visibleItem = this.successItem;
          this.cdRef.markForCheck();
        }
      } else {
        // In case multiple questions, navigate to next.

        this.navigateInList('fwd');
      }
    } else {
      if (this.cancelItem && !data) {
        // Navigate to cancel state display.
        this.visibleItemIndex = -1;
        this.dntEvents.emit('cancel-ev');
        this.visibleItem = this.cancelItem;
      }
      if (
        (this.visibleItemIndex === -1 ||
          this.visibleItemIndex === get(this.contentItems, 'length', -1)) &&
        data
      ) {
        // Emit cancel/success button.
        this.dntEvents.emit(data);
      }
      this.cdRef.markForCheck();
    }
  }
}
