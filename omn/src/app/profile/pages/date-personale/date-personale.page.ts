import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-date-personale',
  templateUrl: './date-personale.page.html',
  styleUrls: ['./date-personale.page.scss'],
})
export class DatePersonalePage implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';

  constructor() {}

  ngOnInit() {}
}
