import { Component, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-petitii',
  templateUrl: './petitii.page.html',
  styleUrls: ['./petitii.page.scss'],
})
export class PetitiiPage implements OnInit {
  headerConfig = subPageHeaderDefault('Petitii');

  acestFormularLink = 'https://www.omniasig.ro/Formular-petitie.html';
  websiteulNostruLink = 'https://www.omniasig.ro';
  constructor() {}

  ngOnInit() {}
}
