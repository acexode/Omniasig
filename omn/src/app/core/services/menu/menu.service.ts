import { Injectable } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  constructor(
    private menu: MenuController
  ) {}

  openMenu() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
  }
}
