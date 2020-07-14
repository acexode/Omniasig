import { Component } from '@angular/core';
import { MenuService } from '../core/services/menu/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  constructor(
    private menuService: MenuService
  ) {}

  openCustom() {
    this.menuService.openMenu();
  }
}
