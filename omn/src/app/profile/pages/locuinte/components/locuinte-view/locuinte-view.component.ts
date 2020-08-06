import { Component, OnInit, HostBinding } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-locuinte-view',
  templateUrl: './locuinte-view.component.html',
  styleUrls: ['./locuinte-view.component.scss'],
})
export class LocuinteViewComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Locuințe');
  variant: string = 'found'; //not-insured, not-found, found.
  @HostBinding('class') color = 'ion-color-white-page';
  constructor() {}

  ngOnInit() {}
}
