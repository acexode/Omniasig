import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-date-personale-validate-email',
  templateUrl: './date-personale-validate-email.component.html',
  styleUrls: ['./date-personale-validate-email.component.scss'],
})
export class DatePersonaleValidateEmailComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';
  constructor() {}

  ngOnInit() {}

  openVerifyModal() {}
}
