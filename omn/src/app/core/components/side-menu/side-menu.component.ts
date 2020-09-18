import { ConfigService } from 'src/app/core/services/config/config.service';
import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Account } from '../../models/account.interface';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() menuRef;
  subMenuHidden = true;
  userAccount: Account;
  isAccountActive = true;
  app_version: string;
  constructor(
    private authService: AuthService,
    private navC: NavController,
    private config: ConfigService
  ) {}

  ngOnInit() {
    console.log(this.config.getVersionNumber());
    this.config.getVersionNumber().then(
      (num) => {
        this.app_version = num;
      },
      (error) => {
        console.log(error);
      }
    );
    this.authService.getAccountData().subscribe((account: Account) => {
      this.userAccount = account;
      this.isAccountActive = this.authService.accountActivated(account);
    });
  }

  public toggleSubMenu() {
    this.subMenuHidden = !this.subMenuHidden;
  }

  public closeMenu() {
    if (this.menuRef) {
      this.menuRef.close();
    }
  }

  public doLogout() {
    this.authService.doLogout();
    this.menuRef.close();
  }
}
