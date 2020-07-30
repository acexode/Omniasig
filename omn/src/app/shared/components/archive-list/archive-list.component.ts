import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { ArchiveListItem } from '../../models/component/archive-list-item';

@Component({
  selector: 'app-archive-list',
  templateUrl: './archive-list.component.html',
  styleUrls: ['./archive-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArchiveListComponent implements OnInit {
  @Input() items: Array<ArchiveListItem>;
  @Input() listConfig: {
    classes: string;
  } = null;
  @Output() clickItem = new EventEmitter();
  constructor() {}

  ngOnInit() {}
  itemClick(id) {
    this.clickItem.emit(id);
  }
}
