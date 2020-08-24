import { Component, OnInit } from '@angular/core';
import { SubPageHeader } from 'src/app/shared/models/component/sub-page-header';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-autentificare',
  templateUrl: './autentificare.component.html',
  styleUrls: ['./autentificare.component.scss'],
})
export class AutentificareComponent implements OnInit {
  headerConfig: SubPageHeader = {
    ...subPageHeaderDefault('Autentificare'),
    trailingIcon: null,
  };

  constructor() { }

  ngOnInit() {}

}
