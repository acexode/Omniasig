import { Component, OnInit } from '@angular/core';
import { Config } from '@ionic/angular';
import { ConfigService } from 'src/app/core/services/config/config.service';

@Component({
  selector: 'app-tab-menu',
  templateUrl: './tab-menu.component.html',
  styleUrls: ['./tab-menu.component.scss'],
})
export class TabMenuComponent implements OnInit {
  currentTab: string;
  release = this.configS.release();
  constructor(private configS: ConfigService) {}

  ngOnInit() {}

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }
}
