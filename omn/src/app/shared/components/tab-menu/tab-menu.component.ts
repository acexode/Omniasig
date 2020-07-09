import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-tab-menu",
  templateUrl: "./tab-menu.component.html",
  styleUrls: ["./tab-menu.component.scss"],
})
export class TabMenuComponent implements OnInit {
  currentTab: string;
  constructor() {}

  ngOnInit() {}

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }
}
