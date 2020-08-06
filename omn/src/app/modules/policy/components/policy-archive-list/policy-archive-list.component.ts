import { Component, OnInit, Input } from '@angular/core';
import { IonTextItem } from 'src/app/shared/models/component/ion-text-item';
import { ArchiveListItem } from 'src/app/shared/models/component/archive-list-item';

@Component({
  selector: 'app-policy-archive-list',
  templateUrl: './policy-archive-list.component.html',
  styleUrls: ['./policy-archive-list.component.scss'],
})
export class PolicyArchiveListComponent implements OnInit {
  @Input() title: IonTextItem = null;
  @Input() items: Array<ArchiveListItem> = [];
  constructor() {}

  ngOnInit() {}
}
