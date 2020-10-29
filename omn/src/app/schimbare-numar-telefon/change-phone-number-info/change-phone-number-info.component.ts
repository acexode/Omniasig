import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-change-phone-number-info',
  templateUrl: './change-phone-number-info.component.html',
  styleUrls: ['./change-phone-number-info.component.scss'],
})
export class ChangePhoneNumberInfoComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  headerConfig = subPageHeaderDefault('Schimbare număr telefon');

  constructor() { }

  ngOnInit() {}
}
