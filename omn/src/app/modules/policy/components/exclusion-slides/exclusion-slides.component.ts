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
import { ExclusionConfig } from './../../../../shared/models/component/exclusion-config';
import { ExclusionItemConfig } from './../../../../shared/models/component/exclusion-item-config';

@Component({
  selector: 'app-exclusion-slides',
  templateUrl: './exclusion-slides.component.html',
  styleUrls: ['./exclusion-slides.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExclusionSlidesComponent implements OnInit {
  @Output() navEvents: EventEmitter<
    'success-ev' | 'cancel-ev' | 'success-btn' | 'cancel-btn' | number
  > = new EventEmitter();
  vConfig: ExclusionConfig;
  visibleItem: ExclusionItemConfig;
  visibleItemIndex = -1;
  contentItems = [];
  successItem: ExclusionItemConfig = null;
  cancelItem: ExclusionItemConfig = null;

  @Input() set config(conf: ExclusionConfig) {
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

  ngOnInit() {}

  public navigateInList(
    type: 'fwd' | 'back' = 'fwd',
    start: 'cancel' | 'success' | number = null
  ) {
    if (type === 'fwd') {
      // Only handle fwd navigation for now.
      const newItem = this.visibleItemIndex + 1;
      if (this.contentItems[newItem]) {
        this.visibleItem = this.contentItems[newItem];
        this.visibleItemIndex = newItem;
        if (this.visibleItemIndex > 0) {
          // Only emit in case multiple steps navigation.
          this.navEvents.emit(this.visibleItemIndex);
        }
        this.cdRef.markForCheck();
      }
    } else {
      let newItem = -1;
      // We may need to provide a starting item in case parent wants to navigate.
      if (start === 'success') {
        newItem = get(this.contentItems, 'length', -1) - 2;
      } else if (start === 'cancel' && this.cancelItem) {
        this.visibleItem = this.successItem;
        newItem = get(this.contentItems, 'length', -1);
      } else {
        newItem = this.visibleItemIndex - 1;
      }
      // don't navigate if no item available.
      if (this.contentItems[newItem]) {
        this.visibleItem = this.contentItems[newItem];
      }
      this.visibleItemIndex = newItem;
      this.navEvents.emit(newItem);
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
      this.navEvents.emit(this.visibleItemIndex);
      if (this.visibleItemIndex === this.contentItems.length - 1) {
        // Reset visible items and redirect to the success.
        this.visibleItemIndex = -1;
        // Emit redirect to success page state.
        this.navEvents.emit('success-btn');
      } else {
        // In case of multiple questions, navigate to next.
        this.navigateInList('fwd');
      }
    } else {
      if (this.cancelItem && !data) {
        // Navigate to cancel state display.
        this.navEvents.emit('cancel-ev');
        this.visibleItem = this.cancelItem;
      }
      if (this.visibleItem === this.cancelItem && data) {
        // Emit cancel button.
        this.navEvents.emit(data);
      }
      if (this.visibleItem === this.successItem && data) {
        // Emit success button click;
        this.navEvents.emit(data);
      }
      this.cdRef.markForCheck();
    }
  }
}
