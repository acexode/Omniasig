import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Account } from '../../models/account.interface';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
})
export class SideMenuComponent implements OnInit {
  @Input() menuRef;
  subMenuHidden = true;
  demoAccount: Account;
  isAccountActive = true;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.getAccountData().subscribe((account: Account) => {
      this.demoAccount = account;
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
}
