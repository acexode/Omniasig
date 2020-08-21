import { Component, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  headerConfig = subPageHeaderDefault('Verificare identitate');

  constructor() { }

  ngOnInit() {}

}
