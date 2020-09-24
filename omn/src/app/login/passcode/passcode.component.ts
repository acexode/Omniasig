import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { unsubscriberHelper } from 'src/app/core/helpers/unsubscriber.helper';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { subPageHeaderTertiary } from 'src/app/shared/data/sub-page-header-tertiary';

@Component({
  selector: 'app-passcode',
  templateUrl: './passcode.component.html',
  styleUrls: ['./passcode.component.scss'],
})
export class PasscodeComponent implements OnInit, OnDestroy {
  min = '00';
  sec: any = 59;
  digitsLength = 0;
  phoneNumber: string = null;
  sub: Subscription;
  busy = false;
  errorLogin: string = null;
  headerConfig = subPageHeaderTertiary('Autentificare');
  @HostBinding('class') color = 'ion-color-white-page';
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.getPhoneNumber();
  }

  ngOnInit() {}

  getPhoneNumber() {
    this.sub = this.route.params.pipe(take(1)).subscribe((params) => {
      if (params.number) {
        this.phoneNumber = params.number;
      } else {
        this.navCtrl.navigateForward(['/login']);
      }
    });
  }

  verifyPasscode(passForm: FormGroup) {
    const data = {
      phone: this.phoneNumber,
      password: passForm.controls.passcode.value,
      aRoute: '/home',
    };
    this.authService.login(data).subscribe(
      (datav) => this.changeCurrentLogin(),
      (error) => this.errLogin(error, passForm)
    );
  }

  changeCurrentLogin() {
    this.authService.saveLastLoginNumber(this.phoneNumber);
  }

  errLogin(err, passForm) {
    passForm.reset();
    this.errorLogin = 'Cod Invalid!';
  }

  clearErr(e) {
    this.errorLogin = null;
  }

  back() {
    console.log('back');
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    unsubscriberHelper(this.sub);
  }
}
