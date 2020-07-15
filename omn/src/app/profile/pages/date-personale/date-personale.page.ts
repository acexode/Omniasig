import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../../core/services/auth/auth.service";

@Component({
  selector: "app-date-personale",
  templateUrl: "./date-personale.page.html",
  styleUrls: ["./date-personale.page.scss"],
})
export class DatePersonalePage implements OnInit {
  accountActivated: boolean;
  account$ = this.authS.getAccountData();
  accountData: any;

  constructor(private authS: AuthService) {}

  ngOnInit() {
    this.account$.subscribe((account) => {
      if (account) {
        this.accountData = account;
        this.accountActivated = this.authS.accountActivated(account);
      }
    });
  }
}
