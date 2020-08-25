import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
  selector: 'app-more-details',
  templateUrl: './more-details.component.html',
  styleUrls: ['./more-details.component.scss'],
})
export class MoreDetailsComponent implements OnInit {
  @HostBinding('class') color = 'ion-color-white-page';

  constructor() {}

  ngOnInit() {}
}
