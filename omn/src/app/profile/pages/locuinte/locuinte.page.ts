import { Component, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-locuinte',
  templateUrl: './locuinte.page.html',
  styleUrls: ['./locuinte.page.scss'],
})
export class LocuintePage implements OnInit {
  headerConfig = subPageHeaderDefault('Locuințe');
  constructor() {}

  ngOnInit() {}
}
