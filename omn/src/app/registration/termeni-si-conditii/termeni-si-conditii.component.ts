import { Component, HostBinding, OnInit } from '@angular/core';
import { subPageHeaderDefault } from 'src/app/shared/data/sub-page-header-default';

@Component({
  selector: 'app-termeni-si-conditii',
  templateUrl: './termeni-si-conditii.component.html',
  styleUrls: ['./termeni-si-conditii.component.scss'],
})
export class TermeniSiConditiiComponent implements OnInit {
  headerConfig = subPageHeaderDefault(' ', 'registration/notice');
  officeMail = 'mailto:office@omniasig.ro';
  omniasigLink = 'https://www.omniasig.ro';
  mailtodpo = 'mailto:dpo@omniasig.ro';
  @HostBinding('class') color = 'ion-color-white-page';
  constructor() { }

  ngOnInit() { }

}
