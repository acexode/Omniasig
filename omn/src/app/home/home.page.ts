import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from '../core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePage {
  account$ = this.authS.getAccountData();
  constructor(
    private menu: MenuController,
    private authS: AuthService,
    private cdRef: ChangeDetectorRef
  ) {}

  openCustom() {
    this.menu.enable(true, 'omn-menu');
    this.menu.open('omn-menu');
    console.log(this.menu);
  }
}
