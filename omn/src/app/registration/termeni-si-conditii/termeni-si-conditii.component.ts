import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-termeni-si-conditii',
  templateUrl: './termeni-si-conditii.component.html',
  styleUrls: ['./termeni-si-conditii.component.scss'],
})
export class TermeniSiConditiiComponent implements OnInit {
  omniasigLink = 'https://www.omniasig.ro';
  mailtodpo = 'mailto:dpo@omniasig.ro';
  @HostBinding('class') color = 'ion-color-white-page';
  constructor() { }

  ngOnInit() {}

}
