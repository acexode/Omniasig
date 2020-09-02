import { AuthService } from 'src/app/core/services/auth/auth.service';
import { ResetPincodeService } from './../services/reset-pincode.service';
import { Router } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-pin-change-successful',
  templateUrl: './pin-change-successful.component.html',
  styleUrls: ['./pin-change-successful.component.scss'],
})
export class PinChangeSuccessfulComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private resetService: ResetPincodeService,
    private auth: AuthService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.resetService.clearResetObj();
    this.auth.doLogout();
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 3000);
  }
}
