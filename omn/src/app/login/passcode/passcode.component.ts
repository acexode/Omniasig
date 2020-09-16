import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonInput, NavController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/internal/operators/take';
import { AuthService } from 'src/app/core/services/auth/auth.service';

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
  constructor(
    private navCtrl: NavController,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    this.getPhoneNumber();
  }

  ngOnInit() {
  }

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
      (error) => this.errLogin(error,passForm)
    );
  }

  changeCurrentLogin() {
    this.authService.saveLastLoginNumber(this.phoneNumber);
  }

  errLogin(err,passForm) {
    passForm.reset();
    this.errorLogin = 'Cod Invalid!';
  }

  clearErr(e){
    this.errorLogin = null;
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.sub.unsubscribe();
  }
}
